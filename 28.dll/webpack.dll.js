/*
使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
*/ 
const {resolve} = require('path');
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
    }
}