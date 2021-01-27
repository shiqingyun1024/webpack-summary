const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[]
    },
    // plugins插件的配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            // 压缩html代码的设置
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })

    ],
    // 模式
    mode:"production"
}