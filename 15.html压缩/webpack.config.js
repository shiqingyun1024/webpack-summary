const{resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// 因为webpack基于node，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[

        ]
    },
    // plugins插件的配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            // 压缩html代码的设置
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['build']
        })
    ],
    // 生产环境下会自动压缩js代码
    mode:'production'
}