const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 遵循commonjs规范
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
        rules:[
            /*
            语法检查：eslint-loader  eslint库
            注意：只检查自己写的源代码，第三方的库是不用检查的
            设置检查规则：
            在package.json中eslintConfig中设置
            "eslintConfig":{
                "extends":"airbnb-base"
            }
            airbnb --> 需要三个库 eslint-config-airbnb-base  eslint  eslint-plugin-import.
            所以要安装：eslint-loader eslint-config-airbnb-base  eslint  eslint-plugin-import
            */ 
           {
               test:/\.js$/,
               // 排除第三方的检查
               excludes:/node_modules/,
               loader:'eslint-loader',
               options:{}
           }

        ]
    },
    // plugin-插件的配置
    plugins:[
        // 复制html到build中
       new HtmlWebpackPlugin({
           template:'./src/index.html'
       }),
       // 每次打包清空build文件夹
       new CleanWebpackPlugin({
           cleanAfterEveryBuildPatterns:['build']
       })
    ],
    // 模式
    mode:'development'
}