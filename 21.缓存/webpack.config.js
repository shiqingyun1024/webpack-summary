const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:{
        index:'./src/js/index.js'
    },
    // 出口文件
    output:{
        // filename:'built.js',
        filename:'[name].[contenthash:8].js',
        path:resolve(__dirname,'build/js')
    },
    // loader的配置
    module:{
        rules:[
            {
                
            }

        ]
    },
    // 插件plugins的配置
    plugins:[
        // 复制html文件，并把每次生成的js和css引入html文件中
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 每次打包前先清空build
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        })

    ],
    // 模式
    mode:'develop',
}