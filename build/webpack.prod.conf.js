'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 合并webpack配置的插件
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩处理css的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩处理js的插件

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
        // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    // webpack输出路径和命名规则
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 丑化压缩JS代码
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    // 警告
                    warnings: false
                    // 构建后的文件 常用的配置还有这些
                    // 去除console.log 默认为false。  传入true会丢弃对console函数的调用。
                    // drop_console: true,
                    // 去除debugger
                    // drop_debugger: true,
                    // 默认为null. 你可以传入一个名称的数组，而UglifyJs将会假定那些函数不会产生副作用。
                    // pure_funcs: [ 'console.log', 'console.log.apply' ],
                }
            },
            // 是否开启sourceMap 这里是true
            sourceMap: config.build.productionSourceMap,
            // 平行处理，加快速度
            parallel: true
        }),
        // extract css into its own file
        // 将css提取到单独的文件
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        // 压缩提取的css
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? {
                safe: true,
                map: {
                    inline: false
                }
            } : {
                safe: true
            }
        }),
        // keep module.id stable when vendor modules does not change
        // 根据代码内容生成普通模块的id，确保源码不变，moduleID不变。
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // 开启作用域提升 webpack3新的特性，作用是让代码文件更小、运行的更快
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        // 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            // 把公共的部分放到 manifest 中
            name: 'manifest',
            // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
            minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // 提取动态组件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
            // 它会与 `options.chunks` 并行被加载。可以通过提供想要的字符串，而不是 `true` 来对输出的文件进行更换名称。
            async: 'vendor-async',
            // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择
            children: true,
            // 最小3个，包含3，chunk的时候提取
            minChunks: 3
        }),

        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            // 忽略.开头的文件。比如这里的.gitkeep，这个文件是指空文件夹也提交到git
            ignore: ['.*']
        }])
    ]
})
// 如果开始gzip压缩，使用compression-webpack-plugin插件处理。这里配置是false
// 需要使用是需要安装 npm i compression-webpack-plugin -Dif (config.build.productionGzip) {
const CompressionWebpackPlugin = require('compression-webpack-plugin')

webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
        // asset： 目标资源名称。 [file] 会被替换成原始资源。
        // [path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
        test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
        ),
        // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
    })
)

// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告
// 输出分析的插件 运行npm run build --report
// config.build.bundleAnalyzerReport这里是 process.env.npm_config_report
// build结束后会自定打开 http://127.0.0.1:8888 链接
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    // 当然也可以用官方提供的网站 http://webpack.github.io/analyse/#home
    // 运行类似 webpack --profile --json > stats.json 命令
    // 把生成的构建信息stats.json上传即可
}

// 多页面html生成
let pages = utils.getMultiEntry('./src/' + config.htmlName + '/*.html');
for (let pathname in pages) {
    // 配置生成的html文件，定义路径等
    let conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
        inject: true, // js插入位置
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        // namifest vendor app引入规则
        chunksSortMode: 'dependency'
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// 最终输出配置文件
module.exports = webpackConfig
