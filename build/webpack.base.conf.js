'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 多页面入口文件
const entries = utils.getMultiEntry('./src/' + config.confName + '/*.js');
// 获得绝对路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
// 定义代码检查规则
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})
// webpack核心模块
module.exports = {
    // 基础上下文
    context: path.resolve(__dirname, '../'),
    // webpack入口文件
    entry: entries,
    // webpack输出文件
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // 初始webpack只能识别js文件，resolve将其他后缀文件转换为js模块
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    // 不同模块的处理规则不同，分别如下：
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                // 对所有.vue文件使用vue-loader进行编译
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                //  对图片资源文件使用url-loader
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 小于10K的图片转成base64编码的dataURL字符串写到代码中
                    limit: 10000,
                    // 其他的图片转移到静态资源文件夹
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                // 对多媒体资源文件使用url-loader
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 小于10K的资源转成base64编码的dataURL字符串写到代码中
                    limit: 10000,
                    // 其他的资源转移到静态资源文件夹
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                // 对字体资源文件使用url-loader
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // hash:7 代表 7 位数的 hash
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    // 这里的node是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一
    // empty 提供空对象。
    // false 什么都不提供。
    // 更多查看 中文文档：https://webpack.docschina.org/configuration/node/
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        // 防止webpack注入一些polyfill 因为Vue已经包含了这些
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
