/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-09-10 19:26:00
 * @LastModifyTime 2020-12-18 10:37:05
 * @desc 在这里安装所有有安装方法的组件
 */

import Vue from 'vue'

const InstallModuleList = require.context('./', true, /(\/install.ts$)/)

InstallModuleList.keys()
    .filter(v => v !== './install.js')
    .map(v => {
        Vue.use(InstallModuleList(v).default)
    })
