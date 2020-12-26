const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    // loader
    module: {
        rules: [
            {
                test: /\.less$/,
                // 使用多个loader
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 处理图片资源处理css、sass、less等文件中的img图片 不过这个loader处理不了在html中img图片，例如：<img src="./images/vue1.jpeg" />，先要用html-loader负责先引入图片，然后由url-loader处理。
            //  url-loader是处理文件中引入的图片路径的，如：background-image: url('./images/vue1.jpeg');  
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                // 使用单个loader
                // 下载url-loader file-loader   url-loader要依赖于file-loader，所以也要下载file-loader
                loader: 'url-loader',
                // 进行配置
                options: {
                    // 图片大小小于8kb，就会被base64处理（一般都处理8~12kb及以下的图片）
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 10 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出现问题，[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    // 给图片进行重命名
                    // [hash:8]取图片的hash的前8位
                    // [ext]取文件原来扩展名
                    name:'[hash:8].[ext]'
                },
            },

            {
                test: /\.html$/,
                // 处理html文件中的img图片，负责引入img，从而能被url-loader进行处理。
                loader: 'html-loader'
            }
        ]
    },
    // plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 模式
    mode: 'development'

}