import Vue from 'vue'
import Vuex from 'vuex'
import { MSUPPLIER_SET_DATA } from './mutation-types'

Vue.use( Vuex )

const state = {
    setdata: 'setdata',
    getdata: 'getdata'
}

const actions = {
    setData ( { commit, state }, to ) {
        commit( MSUPPLIER_SET_DATA, to )
    }
}

const getters = {
    MSUPPLIER_getData: state => {
        return state.getdata
    }
}

const mutations = {
    [MSUPPLIER_SET_DATA] ( state, { data } ) {
        state.setdata = data
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
