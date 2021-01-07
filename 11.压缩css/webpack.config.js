const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 提取css成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 兼容性处理

// webpack基于node，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/index.js',
        path: resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 把css转化为js
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            // 处理兼容性
            {
                loader:'postcss-loader'
            }
        ]
    },
    // plugins的配置
    plugins:[
        // 复制html到build中
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 每次打包清空build文件夹
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        })

    ],
    // 模式
    mode:'development'
}