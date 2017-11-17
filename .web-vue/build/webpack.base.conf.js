var path = require('path')
var utils = require('./utils')
var config = require('../config/index')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包

function resolve(dir) {
    return path.join(__dirname, '../../', dir)
}

module.exports = {
    entry: {
        app: path.join(__dirname, '../../', 'src/main.js')
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('./src'),
            'src': resolve(__dirname, './src'),
            'assets': resolve(__dirname, './src/assets'),
            // 'components': path.resolve(__dirname, '../src/components'),
            // 'views': path.resolve(__dirname, '../src/views'),
            // 'styles': path.resolve(__dirname, '../src/styles'),
            // 'api': path.resolve(__dirname, '../src/api'),
            // 'utils': path.resolve(__dirname, '../src/utils'),
            // 'store': path.resolve(__dirname, '../src/store'),
            // 'router': path.resolve(__dirname, '../src/router'),
            // 'mock': path.resolve(__dirname, '../src/mock'),
            // 'vendor': path.resolve(__dirname, '../src/vendor'),
            // 'static': path.resolve(__dirname, '../static')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
