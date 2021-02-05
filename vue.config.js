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
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = zh_projectName
            return args
        })
    }
}
