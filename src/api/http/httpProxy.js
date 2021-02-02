/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2021-01-12 14:42:55
 * @LastModifyTime 2021-01-12 16:38:59
 * @Description 请求代理层，拿来处理重复请求（缓存方案用装饰器代替）
 */

let pending = []
const waitQueue = new Map()

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

function handleReq(method, args, fn) {
    const hash = hashCode(`${method}${JSON.stringify(args)}`)
    if (pending.includes(hash)) {
        const waitArr = waitQueue.has(hash) ? waitQueue.get(hash) : []
        waitQueue.set(hash, [
            ...waitArr,
            {
                fn,
                createdTime: new Date().getTime()
            }
        ])
    } else {
        fn()
        pending.push(hash)
    }
}

function handleRes(method, args, res) {
    const hash = hashCode(`${method}${JSON.stringify(args)}`)
    if (pending.includes(hash)) {
        pending = pending.filter(v => v !== hash)
        // 清空正在等待的重复请求
        const repeatReq = waitQueue.has(hash) ? waitQueue.get(hash) : []
        repeatReq.forEach(v => {
            v.fn(res)
        })
        waitQueue.set(hash, [])
    }
}

function HttpProxy(fn) {
    const api = {}
    api.get = async (...args) => {
        return new Promise((resolve, reject) => {
            handleReq('get', args, res => {
                if (res) {
                    resolve(res)
                    return
                }
                fn.get(...args)
                    .then(res => {
                        handleRes('get', args, res)
                        resolve(res)
                    })
                    .catch(error => {
                        handleRes('get', args, error)
                        reject(error)
                    })
            })
        })
    }

    api.post = (...args) => {
        return new Promise((resolve, reject) => {
            fn.post(...args)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    api.delete = (...args) => {
        return new Promise((resolve, reject) => {
            fn.delete(...args)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    api.put = (...args) => {
        return new Promise((resolve, reject) => {
            fn.put(args)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    return api
}

export default HttpProxy
