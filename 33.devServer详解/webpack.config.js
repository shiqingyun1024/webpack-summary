const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 因为node使用的是commonjs，webpack配置是基于node的，所以也是commonjs规范
module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    // loader配置
    module: {
        rules: [
            // 处理样式的loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            // 处理字体图标,用file-loader
            {
                // 除了什么之外
                exclude: /\.(css|html|js)$/,
                loader: "file-loader",
                options: {
                    name: '[hash:8].[ext]'
                }
            }
        ]
    },
    // plugin配置
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

    // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~~）
    // 特点：只会在内存中编译打包，不会有任何输出（如果直接运行npx webpack-dev-server，是没有输出的，不会生成build文件夹，因为是在内存中编译打包。运行webpack会有输出，输出build文件夹）
    // 启动devServer指令为：npx webpack-dev-server，因为没有全局安装，所以用npx webpack-dev-server，如果全局安装了，可以直接webpack-dev-server，但是没有必要。
    // webapck全局安装了，所以可以直接用webpack，如果没有全局安装，就用 npx webpack
    // 一定要安装webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        //  启动gzip压缩
        compress: true,
        // 启动服务的端口号
        port: 3000,
        // 自动打开浏览器
        open:true
    }

}