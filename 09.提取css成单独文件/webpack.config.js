const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// webpack基于node，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/built.js',
        path: resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            {
              test:/\.css$/,
              use:[
                //   创建style标签，将样式放入
                //   'style-loader',
                //   这个loader取代style-loader。作用：提取js中的css成单独文件
                MiniCssExtractPlugin.loader,
                //   将css文件整合到js文件中
                  'css-loader'
              ]
            }
        ]
    },
    // plugin配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        }),
        // 提取js文件的css文件
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename:'css/built.css'
        })
    ],
    // 模式
    mode: 'development'
}