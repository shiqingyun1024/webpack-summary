const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拷贝文件到打包后的路径
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
                // 处理其他资源,排除下面这几个
                exclude: /\.(html|js|css|png|jpeg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:8].[ext]'
                }
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
        }),
        new CopyWebpackPlugin(
            // patterns: [{
            [{
                from: resolve(__dirname, './media'),
                to: 'media',
                ignore: ['.*']
            }
            ]
        )

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
    },
    devtool:'inline-source-map'
}
/*
  source-map:一种提供源代码到构建后代码的映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）非常利于调试，去找错误的原因
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

  source-map: 外部
      错误代码的准确信息 和 源代码的错误位置
  inline-source-map: 内联 只生成一个内联source-map 错误代码的准确信息 和 源代码的错误位置
  hidden-source-map: 外部
  eval-source-map: 内联  每一个文件都生成对应的source-map，都在eval函数中
  nosources-source-map: 外部
  cheap-source-map: 外部
  cheap-module-source-map: 外部
  内联和外部的区别：1、外部生成了文件(如build.map.js)，内联没有(内联是把相关的映射代码加到了built.js里面)  2、内联构建速度更快
*/