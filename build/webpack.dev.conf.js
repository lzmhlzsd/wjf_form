const webpack = require( 'webpack' )
const config = require( './config' )
const path = require( 'path' )

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-module-source-map',

    devServer: {
        host: config.devServer.host,
        port: config.devServer.port,
        overlay: {
            warnings: true,
            errors: true
        },
        hot: true,
        open: true,
        // gzip
        compress: true,
        contentBase: path.join( __dirname, '../dist' ),
        historyApiFallback: true,
        proxy: config.devServer.proxy,
        disableHostCheck: true
    },

    plugins: [
        // webpack 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 热加载时直接返回更新文件名
        new webpack.NamedModulesPlugin()
    ]
}
