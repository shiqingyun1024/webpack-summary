const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口文件
    entry:'./src/index.js',
    // 出口文件
    output:{
        filename:'built.js',
        path: resolve(__dirname,'build')
    },
    // loader
    module:{
        rules:[
           {
               test:/\.less$/,
               // 使用多个loader
               use:[
                   'style-loader',
                   'css-loader',
                   'less-loader'
               ]
           },
              // 处理图片资源
           {
            test:/\.(jpg|png|jpeg|gif)$/,
            // 使用单个loader
            // 下载url-loader file-loader   url-loader要依赖于file-loader，所以也要下载file-loader
            loader:'url-loader',
            // 进行配置
            options:{
                // 图片大小小于8kb，就会被base64处理（一般都处理8~12kb及以下的图片）
                // 优点：减少请求数量（减轻服务器压力）
                // 缺点：图片体积会更大（文件请求速度更慢）
                limit: 10*1024
            }
        }
        ]
    },
    // plugins
    plugins:[
       new HtmlWebpackPlugin({
           template:'./src/index.html'
       })
    ],
    // 模式
    mode:'development'

}