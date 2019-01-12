const productionConfig = require( './webpack.prod.conf' )
const developmentConfig = require( './webpack.dev.conf' )
const config = require( './config' )
const merge = require( 'webpack-merge' )
const path = require( 'path' )
const webpack = require( 'webpack' )
const _ = require( 'lodash' )
const colors = require( 'colors' )

const ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin

const generateConfig = env => {
    const htmlwebpackPlugin = () => {
        const array = []
        config.pages.map( page => {
            array.push( new HtmlWebpackPlugin( {
                filename: page.name + '.html',
                title: page.title,
                description: page.description,
                keywords: page.keywords,
                logo: page.logo,
                header: page.header,
                active: page.active,
                template: page.template,
                chunks: page.chunks,
                chunksSortMode: 'manual',
                env: env
            } ) )
        } )
        return array
    }
    return {
        // 多页面入口
        entry: () => {
            let obj = {}
            config.pages.map( page => {
                obj = Object.assign( obj, page.entry )
            } )
            _.forEach( obj, function ( value, key ) {
                console.log( value.bgCyan )
            } )
            return obj
        },

        // 输出
        output: {
            path: path.resolve( __dirname, '../server/dist' ),
            publicPath: '/',
            filename: 'js/[name]-bundle-[hash:5].js',
            chunkFilename: 'js/[name]-[hash:5].js'
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'vue-router$': 'vue-router/dist/vue-router.esm.js'
            }
        },

        module: {
            // unknownContextCritical: false,
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'].concat( env === 'production' ? [] : [{
                        loader: 'eslint-loader',
                        options: {
                            formatter: require( 'eslint-friendly-formatter' )
                        }
                    }] ),
                    include: [path.resolve( __dirname, '../src' )]
                },
                {
                    test: /iview\/.*?js$/,
                    use: [{
                        loader: 'babel-loader'
                    }]
                },
                {
                    test: /\.(css|less)$/,
                    use: env === 'production' ? ExtractTextWebpackPlugin.extract( {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: env === 'development'
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: env === 'development'
                                }
                            }
                        ]
                    } ) : [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: env === 'development'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: env === 'development'
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: env === 'development'
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    use: [{
                        loader: 'vue-loader'
                    }, {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: env === 'production' ? [{
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]', // 文件名   ext 文件后缀
                            limit: 1000,
                            outputPath: 'imgs/'
                        }
                    }] : [{
                        loader: 'file-loader', // file-loader
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            outputPath: 'imgs/'
                        }
                    }]
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: env === 'production' ? [{
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]', // 文件名   ext 文件后缀
                            limit: 1000,
                            outputPath: 'font/'
                        }
                    }] : [{
                        loader: 'file-loader', // file-loader
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            outputPath: 'font/'
                        }
                    }]
                }
            ]
        },

        plugins: [
            new ExtractTextWebpackPlugin( {
                filename: 'css/[name]-bundle-[hash:5].css'
            } )
        ].concat( htmlwebpackPlugin() )
    }
}
module.exports = env => {
    let config = env === 'production' ? productionConfig : developmentConfig
    return merge( generateConfig( env ), config )
}
