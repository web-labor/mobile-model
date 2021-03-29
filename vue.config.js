const webpack = require("webpack");
const DllConfig = require('./webpack.dll.config')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { name: projectName, zh_name: zh_projectName } = require('./package.json')
const en = 'dev'
const envir = {
    dev: 'https://dev.kdweibo.cn',
    pro: 'https://www.yunzhijia.com',
    devpro: 'https://kdtest.kdweibo.cn'
}
const src = envir[en]

module.exports = {
    publicPath: `/${projectName}`,
    outputDir: 'dist',
    lintOnSave: process.env.NODE_ENV !== 'production', // eslint-loader 是否在保存的时候检查
    devServer: {
        disableHostCheck: true,
        proxy: {
            // 文件上传服务
            '/docrest': {
                target: src,
                changeOrigin: true
            },
            '/journal-service': {
                target: src,
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
            Object.keys(DllConfig.entry).forEach(key => {
                config.plugins.push(new webpack.DllReferencePlugin({
                    context: process.cwd(),
                    manifest: require(`./public/lib/${key}-manifest.json`)
                }))
            })
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = zh_projectName
            return args
        })
        config.optimization.splitChunks({
            cacheGroups: {
              common: {
                name: 'chunk-common', // 打包后的文件名
                chunks: 'initial', //
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 1,
                reuseExistingChunk: true
              },
              vendors: {
                name: 'chunk-vendors',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'initial',
                priority: 2,
                reuseExistingChunk: true,
                enforce: true
              },
              elementUI: {
                name: 'chunk-vant-ui-vue',
                test: /[\\/]node_modules[\\/]vant[\\/]/,
                chunks: 'initial',
                priority: 3,
                reuseExistingChunk: true,
                enforce: true
              }
            }
          })
    }
}
