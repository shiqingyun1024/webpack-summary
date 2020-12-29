const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
                  'style-loader',
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
        })
    ],
    // 模式
    mode: 'development'
}