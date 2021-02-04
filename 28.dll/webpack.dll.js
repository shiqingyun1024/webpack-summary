/*
使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
*/ 
const {resolve} = require('path');
const webpack = require('webapck');
module.exports = {
    entry:{
        // 最终打包生成的[name]---->jquery
        // ['jquery'] --->要打包的库是jquery
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash:8]',//打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个manifest.json --> 提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash:8]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json'), // 输出文件路径
        })
    ]
}