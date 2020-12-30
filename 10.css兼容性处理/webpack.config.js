const {resolve} = require('path');
// 处理index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 从js中抽取css，抽到css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除打包构建后的文件夹build
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// webpack是基于node环境，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        // 文件名
        filename:'build/js/built.js',
        path:resolve(__dirname,'build')

    },
    // loader 配置
    module:{
       rules:[
           {
             test:/\.css$/,
             use:[
                //  把样式从js抽取出来，用style标签加载到html文件中
                //  'style-loader'
                // MiniCssExtractPlugin.loader用于把css从js中抽离出来，抽取到css文件里面，所以就用不到style-loader了。
                MiniCssExtractPlugin.loader,
                'css-loader'
             ]
           }
       ]
    },
    // plugin的配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        }),
        // 提取js文件的css文件
        new MiniCssExtractPlugin({
            // 对输出的文件进行重命名
            filename:'build/css/built.css'
        })

    ],
    // 模式
    mode:'development'
}