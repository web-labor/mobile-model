import { expect } from 'chai'
import { isNUllObject } from '@/service/utils.service.js'

describe('isNUllObject测试', () => {
    it('isNUllObject测试 passed', () => {
        expect(isNUllObject({})).to.equal(true)
    })
})
