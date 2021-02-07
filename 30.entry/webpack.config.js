// webpack是基于node的，所以遵循commonjs规范
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[]
    },
    // 插件的配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // 模式
    mode:'development'

}