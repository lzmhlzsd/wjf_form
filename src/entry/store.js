import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { menu, store } from './../module.config'
import {
    GET_SELECT_MENU
} from './mutation-types'
Vue.use( Vuex )
const state = {
    // menu_open: [],
    // menu_active: '',
    // paths: [],
    // path: '',
    // 主菜单是否显示
    showheader: true,
    showmenu: true,
    showsubmenu: true,
    // 当前选择的菜单
    selectMenu: []
}
const actions = {
    getSelectMenu ( { commit, state }, to ) {
        commit( GET_SELECT_MENU, to )
    }
}
const getters = {
    getAppPath: state => {
        return state.path
    }
}

const mutations = {
    // 获取当前选中的菜单
    [GET_SELECT_MENU] ( state, to ) {
        // 存储是否显示菜单
        if ( typeof to.meta.showheader !== 'undefined' && to.meta.showheader.toString() === 'false' ) {
            state.showheader = false
        } else {
            state.showheader = true
        }
        if ( typeof to.meta.showmenu !== 'undefined' && to.meta.showmenu.toString() === 'false' ) {
            state.showmenu = false
        } else {
            state.showmenu = true
        }
        if ( typeof to.meta.showsubmenu !== 'undefined' && to.meta.showsubmenu.toString() === 'false' ) {
            state.showsubmenu = false
        } else {
            state.showmenu = true
        }
        _.forEach( menu, function ( value, index ) {
            let currentPath = to.path.split( '/' )[1]
            if ( value.url.split( '/' )[1] === currentPath ) {
                state.selectMenu = value
            }
        } )
    }
}
export default new Vuex.Store( {
    modules: store,
    state,
    actions,
    getters,
    mutations
} )
