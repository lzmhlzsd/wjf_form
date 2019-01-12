/*
    模块注册： 注册路由、菜单、vuex、iconfont
*/
import { router as mshopdesignRouter, menu as mshopdesignMenu, store as mshopdesignStore } from './modules/mshopdesign/module.export'
import { router as msupplierRouter, menu as msupplierMenu, store as msupplierStore } from './modules/msupplier/module.export'

const router = [].concat( mshopdesignRouter, msupplierRouter, [
    // 配置默认路由
    {
        path: '/',
        redirect: '/mshopdesign-action1'
    }
] )
const menu = [].concat( mshopdesignMenu, msupplierMenu )
const store = Object.assign( {}, mshopdesignStore, msupplierStore )
export { router, menu, store }
