/*
source-map:一种提供源代码到构建后代码的映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）非常利于调试，去找错误的原因
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('html-webpack-plugin');
const { resolve } = require('path');
// webpack是基于node配置的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry: './src/js/index.js',
    // 出口文件
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [
            {
                // 处理css文件
                test: /\.css$/,
                use: [
                    // style-loader含有热更新功能，所以css改变之后会自动热更新。
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 处理图片资源
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'url-loader'
            },
            {
                // 处理html中的图片
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exculde: /\.(html|css|png|jpeg|jpg|gif)/
            }

        ]
    },
    // plugin插件的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        })

    ],
    // 模式
    mode: 'development',
    // 开发服务器
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        //  启动gzip压缩
        compress: true,
        // 启动服务的端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true
    }
}