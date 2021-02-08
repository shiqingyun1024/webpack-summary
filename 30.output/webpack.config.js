// webpack是基于node的，所以遵循commonjs规范
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口文件
    entry:'./src/index.js',
    // 出口文件
    output:{
        filename:'[name].[contenthash:8].js',
        path:resolve(__dirname,'build')
    },
    plugins:[new HtmlWebpackPlugin()],
    mode:'development'
}