const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 记住clean-webapck-plugin不是直接引用的，是放在一个对象里面。
// 使用nodejs的commonjs模块化规范
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 处理css资源
            {
               test:/\.css$/,
               use:['style-loader','css-loader']
            },
            // 使用file-loader来进行处理iconfont图标
            // 打包其他资源（除了html/js/css资源以外的资源）
           {
            //  排除css/js/html资源
            exclude:/\.(html|css|js)$/,
             loader:'file-loader',
             options:{
                 name:'[hash:8].[ext]'
             }
           }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        })

    ],
    mode:"development"
}