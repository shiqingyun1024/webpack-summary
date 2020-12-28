const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 因为node使用的是commonjs，webpack配置是基于node的，所以也是commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/index.js',
    // 出口文件
    output:{
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            // 处理样式的loader
            {
              test:/\.css$/,
              use:[
                  'style-loader',
                  'css-loader',
              ]
            },
            // 处理字体图标,用file-loader
            {
                // 除了什么之外
              exclude:/\.(css|html|js)$/,
              loader: "file-loader",
              options:{
                  name:'[hash:8].[ext]'
              }
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
        })
    ],
    // 模式
    mode:'development'

}