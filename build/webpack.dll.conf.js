const path = require( 'path' )
const webpack = require( 'webpack' )

const CleanWebpackPlugin = require( 'clean-webpack-plugin' )
const outPath = '../server/dist/dll'
// const config = require( './config' )
// const QnWebpack = require( 'qn-webpack' )

module.exports = {
    // 入口
    entry: {
        vue: ['vue/dist/vue.esm.js', 'vue-router', 'iview/dist/iview.min.js']
    },

    // 输出
    output: {
        path: path.join( __dirname, outPath ),
        filename: '[name].dll.js',
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin( {
            // path: path.join( __dirname, outPath, '[name]-manifest.json' ),
            // name: '[name].dll.js',
            // context: __dirname

            path: path.join( __dirname, outPath, '[name]-manifest.json' ),
            name: '[name]',
            context: __dirname
        } )

        // new CleanWebpackPlugin( path.resolve( __dirname, outPath ), {
        //     root: path.resolve( __dirname, '../server' ), // 设置root
        //     verbose: true, // 一个根的绝对路径
        //     exclude: [] // 排除不删除的目录，主要用于避免删除公用的文件
        // } )
    ]
}
