/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-10-20 12:17:01
 * @LastModifyTime 2021-01-14 14:06:23
 */
import CommonApi from './route/common'
import JounralServiceApi from './route/journal-service'

export class Api {
    constructor() {
        this.jounralService = new JounralServiceApi()
        this.common = new CommonApi()
    }
}

export default new Api()
