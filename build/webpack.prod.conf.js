const webpack = require( 'webpack' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' )
// const config = require( './config' )

const path = require( 'path' )
// var glob = require( 'glob-all' )
// const CompressionWebpackPlugin = require( 'compression-webpack-plugin' )
// const QnWebpack = require( 'qn-webpack' )

// const commonChunks = () => {
//     const chunkarray = []
//     config.pages.map( page => {
//         chunkarray.push( page.name )
//     } )
//     return chunkarray
// }
module.exports = {
    plugins: [
        // new CompressionWebpackPlugin(),

        // new QnWebpack( {
        //     accessKey: config.cdn.accessKey,
        //     secretKey: config.cdn.secretKey,
        //     bucket: config.cdn.bucket,
        //     path: config.cdn.path,
        //     exclude: `/index\.html$/`
        // } ),

        new webpack.DllReferencePlugin( {
            // context: __dirname,
            // manifest: require( '../dist/dll/vue-manifest.json' ) // 动态链接

            context: __dirname,
            manifest: require( '../dist/dll/vue-manifest.json' )
        } ),

        new webpack.optimize.CommonsChunkPlugin( {
            name: 'manifest',
            minChunks: Infinity
        } ),

        // js压缩
        new webpack.optimize.UglifyJsPlugin(), // UglifyJsPlugin 支持平行打包压缩，提高速度
        new UglifyJsPlugin( {
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false, // 去掉sourceMap，加快压缩速度
            parallel: true, // 平行线程处理，加快压缩速度
            cache: true // 使用缓存，加快压缩速度
        } ),
        new CleanWebpackPlugin( path.resolve( __dirname, '../dist' ), {
            root: path.resolve( __dirname, '../../../' ), // 设置root
            verbose: true, // 一个根的绝对路径
            exclude: ['dll'] // 排除不删除的目录，主要用于避免删除公用的文件
        } )
    ]
}
