/*
  开发环境配置：能让代码运行即可
  运行命令：webpack
           npx webpack-dev-server

           webpack运行之后将打包结果输出，
           webpack-dev-server在内存中编译，不会输出结果。
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack基于node，所以遵循commonjs规范
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
            // less样式资源
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // css样式资源
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // 图片资源,主要是处理样式中的图片
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    esModule: false,
                    name: '[hash:8].[ext]',
                    // 指定输出的文件夹名
                    outputPath:'images'
                }
            },
            // 处理html中的图片,这个一定注意，有时候会弄混
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            // 其他资源,字体图标等
            {
                // 排除
                exclude: /\.(html|js|less|css|png|jpg|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:8].[ext]',
                    // 指定输出的文件夹名
                    outputPath:'media'
                }
            }
        ]
    },
    // plugins 插件的配置
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
        // 构建后的路径
        contentBase: resolve(__dirname, 'build'),
        //  启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}