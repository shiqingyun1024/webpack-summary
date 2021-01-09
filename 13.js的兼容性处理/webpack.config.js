const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// webpack基于node，所以遵循commonjs
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    outpath:{
        filename:'js/built.js',
        path: resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }

        ]
    },
    // plugins插件的配置
    plugins:[
        // 复制html到build
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 清除打包文件build
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        })
    ],
    // 模式
    mode:'development'
}