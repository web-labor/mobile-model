const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// dll文件存放的目录
const dllPath = 'public/lib'
module.exports = {
    // 入口文件
    entry: {
        vue: ['vue', 'vue-router', 'vuex'],
        other: ['axios']
    },
    // 输出文件
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, dllPath)]
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ]
}
