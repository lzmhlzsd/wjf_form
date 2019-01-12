import moduleInfo from './module.info'
// 路由
import router from './router/index'
// 菜单
import menu from './js/libs/menu'
// vuex
import mstore from './vuex/store'
// iconfont
import iconfont from './font/iconfont.css'

const store = {}
store[moduleInfo.modulename] = mstore

export {
    router,
    menu,
    store,
    iconfont
}
