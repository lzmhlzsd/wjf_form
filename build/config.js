module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 9003,
        proxy: {
            '/api': {
                // target: 'http://rap2api.taobao.org/app/mock/70210/',
                target: 'http://0.0.0.0:3000',
                secure: false, // 接受 https
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                onProxyRes: function ( proxyRes, req, res ) {}
            }
        }
    },
    pages: [
        {
            title: '表单系统',
            description: '表单系统',
            keywords: '表单系统',
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
