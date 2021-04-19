/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2021-01-12 14:42:55
 * @LastModifyTime 2021-01-12 16:38:59
 * @Description 请求代理层，拿来处理重复请求（缓存方案用装饰器代替）
 */

const promiseCache = new Map()

class Cache {
    constructor({ hash, req, expire = 1000 }) {
        this.hash = hash
        this.req = req
        this.expire = expire
        this.initTime = new Date().getTime()
    }

    getReq() {
        const curTime = new Date().getTime()
        if (curTime - this.expire > this.initTime) {
            return false
        }
        return this.req
    }
}

// 给字符串生成hash值
function hashCode(str) {
    let hash = 0,
        i,
        chr
    if (str === 0) return hash
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return hash
}

function HttpProxy(fn) {
    const api = {}

    api.get = (...args) => {
        const hash = hashCode(`get${JSON.stringify(args)}`)
        let req = promiseCache.has(hash) ? promiseCache.get(hash).getReq() : ''
        if (!req) {
            req = fn.get.call(this, ...args)
            const cache = new Cache({ hash, req })
            promiseCache.set(hash, cache)
        }
        return new Promise((reslove, reject) => {
            req.then(res => {
                reslove(res)
            }).catch(error => {
                reject(error)
            })
        })
    }

    api.post = (...args) => {
        return fn.post(...args)
    }

    api.delete = (...args) => {
        return fn.delete(...args)
    }

    api.put = (...args) => {
        return fn.put(args)
    }

    return api
}

export default HttpProxy
