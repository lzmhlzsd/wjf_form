const path = require( 'path' )
module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 9002,
        proxy: {
            '/api': {
                // target: 'http://rap2api.taobao.org/app/mock/70210/',
                target: 'http://scrm.ishopex.cn/',
                secure: false, // 接受 https
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                onProxyRes: function ( proxyRes, req, res ) {}
            }
            // '/': {
            //     target: 'http://192.168.95.136:8888',
            //     changeOrigin: true,
            //     secure: false,
            //     onProxyRes: function ( proxyRes, req, res ) {
            //         var cookies = proxyRes.headers['set-cookie']
            //         var cookieRegex = /Path=\/laravel_session/i
            //         // console.log( cookies )
            //         // 修改cookie Path
            //         if ( cookies ) {
            //             var newCookie = cookies.map( function ( cookie ) {
            //                 if ( cookieRegex.test( cookie ) ) {
            //                     return cookie.replace( cookieRegex, 'Path=/' )
            //                 }
            //                 console.log( cookie )
            //                 return cookie
            //             } )
            //             // 修改cookie path
            //             delete proxyRes.headers['set-cookie']
            //             proxyRes.headers['set-cookie'] = newCookie
            //         }
            //     }
            // }
        }
    },
    pages: [
        {
            title: '商派SAAS平台',
            description: '商派SAAS平台',
            keywords: '商派SAAS平台',
            active: 'home',
            entry: {
                index: './src/entry/index.js'
            },
            template: 'ejs-compiled-loader!./src/entry/index.html',
            name: 'index',
            chunks: ['manifest', 'common', 'index']
        }
    ]
}
