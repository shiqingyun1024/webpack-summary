// webpack是基于node的，所以遵循commonjs规范
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
  entry: 入口起点
       1、string  --> './src/index.js'
          打包形成一个chunk。输出一个bundle文件。
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
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // 模式
    mode:'development'
}