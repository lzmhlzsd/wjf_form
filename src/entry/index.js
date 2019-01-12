import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './../../router/index'
import routes from './router'
import store from './store'
import App from './App.vue'

import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
import './../css/common/base.less'
// import './../css/common/style.less'
import shopexUi from 'shopex-ui'
// import './../../font/iconfont.css'
// require( './../../font/iconfont.css')

// /* eslint-disable */
// // eslint-disable-next-line  下一行不检查
// Promise.all([
//     require("./../modules/module1/font/iconfont.css") // eslint-disable-line no-alert, quotes, semi
// ]);

Vue.use( VueRouter )
Vue.use( iView )
Vue.use( shopexUi )

useAxios()

const router = new VueRouter( {
    mode: 'history',
    routes
} )

router.beforeEach( ( to, from, next ) => {
    // console.log( to )
    store.dispatch( 'getSelectMenu', to )
    next()
} )

iView.LoadingBar.config( {
    color: '#b3c8f3',
    failedColor: '#f0ad4e',
    height: 3
} )

new Vue( {
    router,
    store,
    render: h => h( App )
} ).$mount( '#app' )

function useAxios () {
    const axios = require( 'axios' )
    const qs = require( 'qs' )

    axios.defaults.baseURL = '/api'
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.interceptors.request.use( config => {
        console.log( config )
        if ( config.method === 'get' ) {
            config.params = {
                _: Date.now(),
                ...( config.params || {} ),
                ...( config.data || {} )
            }
            config.transformRequest = [
                function ( data, headers ) {
                    return qs.stringify( data )
                }
            ]
        }
        return config
    } )
    axios.interceptors.response.use( res => {
        return res.data
    } )

    Vue.prototype.$http = axios
}
