/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-09-14 14:09:05
 * @LastModifyTime 2020-12-23 16:35:16
 * @desc 统一将原生能力写在这里
 */

const native = window.qing

class Native {
    isApp
    isAndroid
    constructor() {
        this.isApp = native.isSupportNativeJsBridge
        this.isAndroid =
            native.isAndroid || native.isAndroidPhone || native.isAndroidTable
    }

    call(...params) {
        native.call.apply(this, params)
    }

    on(...params) {
        native.on.apply(this, params)
    }

    setTitle(title) {
        native.call('setWebViewTitle', { title }) // 设置页面标题并显示
    }

    hideNativeHeader() {
        native.call('setWebViewTitleBar', {
            isShow: false
        })
    }

    goOutlink(
        { url = '', title = '', appId = '', callbackId = '' },
        cb = () => {}
    ) {
        native.call('gotoLightApp', {
            appName: title,
            urlParam: url,
            appId,
            callbackId,
            success: cb
        })
    }

    closeWebview() {
        native.call('closeWebView')
    }

    async selectPerson({ selected = [], isMulti = true, hideOrg = false }) {
        return new Promise((resolve, reject) => {
            native.call('selectPersons', {
                isMulti,
                hideOrg,
                selected,
                success: res => {
                    resolve(res)
                },
                error: res => {
                    reject(res)
                }
            })
        })
    }

    async selectOrg({
        selectedOrgs = [],
        isMulti = true,
        isAllowEmpty = false
    }) {
        return new Promise((resolve, reject) => {
            native.call('selectOrgs', {
                isMulti,
                isAllowEmpty,
                selectedOrgs,
                success: res => {
                    resolve(res)
                },
                error: res => {
                    reject(res)
                }
            })
        })
    }

    async selectImg() {
        return new Promise((resolve, reject) => {
            native.call('selectPhoto', {
                success: res => {
                    if (res.success) {
                        resolve(res.data)
                    } else {
                        reject(res.error)
                    }
                },
                error: res => {
                    reject(res)
                }
            })
        })
    }

    async selectFile() {
        return new Promise((resolve, reject) => {
            native.call('selectFile', {
                pLine: 'true',
                success: res => {
                    if (res.success) {
                        resolve(res.data)
                    } else {
                        reject(res.error)
                    }
                },
                error: res => {
                    reject(res)
                }
            })
        })
    }

    async showFile({ fileId, fileName, fileType, fileSize }) {
        return new Promise((resolve, reject) => {
            native.call('showFile', {
                fileId,
                fileName,
                fileType,
                fileSize,
                fileExt: fileType,
                success: res => {
                    if (res.success) {
                        resolve(res.data)
                    } else {
                        reject(res.error)
                    }
                },
                error: res => {
                    reject(res)
                }
            })
        })
    }

    async toast(msg = '') {
        if (!msg) {
            return
        }
        native.call('toast', {
            msg
        })
    }

    async gotoApp({ appId, appName, urlParam }) {
        native.call('gotoLightApp', {
            appId,
            appName,
            urlParam
        })
    }
}

const $native = new Native()
export default Native
export { $native }
