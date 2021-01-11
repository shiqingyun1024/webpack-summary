const { resolve } = require('path');
// 抽离css代码成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 定义nodejs的环境变量:决定使用package.json中的browserslist的生产环境还是测试环境
process.env.NODE_ENV = 'production';

// 抽离loader中公用的部分，代码复用性
const commonCssLoader = [
   // MiniCssExtractPlugin.loader是把js中的css抽离成一个单独的文件
   MiniCssExtractPlugin.loader,
   // css-loader是把css转化为js
   'css-loader',
   // css兼容性处理,需要安装postcss-loader、postcss-preset-env，还需要新建postcss.config.js，还要在package.json中配置browserslist
   {
       loader:'postcss-loader'
   }
]
// webpack是基于node的，所以遵循commonjs规范
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
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test:/\.less$/,
                use:[
                    ...commonCssLoader,
                    // less-loader把less文件转化css文件
                    'less-loader'
                ]
            },
            // js的语法检查，eslint-loader
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader'
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
        // 指定抽离的css文件名和路径
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),

    ],
    // 模式
    mode: 'production'
}