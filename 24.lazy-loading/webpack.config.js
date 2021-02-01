const { path } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 因为webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry: "./src/js/index.js",
    // 出口文件
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [

        ]
    },
    // plugins插件的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanEveryBuildPatterns: ['build']
        })
    ],
    // 代码分割配置
    /*
      1、单页面应用 可以将node_modules中代码单独打包成一个chunk最终输出，打包的时候自己写的单独打成一个包，第三方文件单独打成一个包
      2、多页面应用 自动分析多入口文件中，有没有公共的文件。如果有，会打包成单独的一个文件
      3、巨大的js文件拆分成许多js文件，可以并行加载，速度更快。
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    // 模式
    mode: 'production'
}