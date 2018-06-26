'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 一个合并数组和对象的插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 自动检索下一个可用端口
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT) //读取系统环境变量的port

// 合并baseWebpackConfig配置
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        // 对一些独立的css文件以及它的预处理文件做一个编译
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    //  webpack-dev-server服务器配置
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        // 单页面路由的history模式设置
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
            }, ],
        },
        hot: true, // 热加载
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable, // 代理设置
        quiet: true, // necessary for FriendlyErrorsPlugin
        // 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
        watchOptions: {
            poll: config.dev.poll, // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。默认为false
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})
// 多页面html生成
var pages = utils.getMultiEntry('./src/' + config.htmlName + '/*.html');
console.log("pages=" + pages);
for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
        inject: true // js插入位置
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
