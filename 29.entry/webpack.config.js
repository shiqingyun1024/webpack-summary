// webpack是基于node的，所以遵循commonjs规范
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
  entry: 入口起点
       1、string
       2、array
       3、object
*/ 
module.exports = {
    // 入口文件
    entry:'./src/inde.js',
    // 出口文件
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // 插件配置
    plugins:[
        new HtmlWebpackPlugin()
    ],
    // 模式
    mode:'development'
}