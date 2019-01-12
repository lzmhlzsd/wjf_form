/*
    模块注册： 注册路由、菜单、vuex、iconfont
*/
import { router as mformRouter, menu as mformMenu, store as mformStore } from './modules/mform/module.export'

const router = [].concat( mformRouter, [
    // 配置默认路由
    {
        path: '/',
        redirect: '/formlist'
    }
] )
const menu = [].concat( mformMenu )
const store = Object.assign( {}, mformStore )
export { router, menu, store }
