const CompressionWebpackPlugin = require('compression-webpack-plugin')
const projectName = require('./package.json').name
const en = 'local'
const envir = {
    local: 'http://172.20.200.84:10405/',
    dev: 'https://dev.kdweibo.cn',
    pro: 'https://jsy.baiyyy.com',
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
                target: 'https://dev.kdweibo.cn',
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
    }
}
