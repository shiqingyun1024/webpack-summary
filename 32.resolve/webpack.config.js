/*
 loader: 1、下载  2、使用（配置loader）
 plugins：1、下载 2、引入  3、使用
*/ 
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    // 入口文件
    entry:'./src/index.js',
    // 出口文件
    output:{
        // 文件名称 （指定名称+目录）
        filename:'js/[name].[contenthash:8].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,'build'),
        // 所有资源引入公共路径前缀 ---> 'imgs/a.jpg' --> '/imgs/a.jpg' 一般用于生产环境
        publicPath:'/',
        // 非入口chunk的名称
        chunkFilename:'js/[name]_chunk.js',
        // library的作用  表示整个库向外暴露的变量名  main.js中的window["main"] =中的"main"
        library:'[name]',
        // libraryTarget表示变量名添加到哪个上  main.js中的window["main"] =中的window   这样其他的js文件可以使用main.js中的方法
        libraryTarget:'window',
        // libraryTarget:'commonjs' // 这个时候main.js中的开头是 exports["main"]
    },
    // loader的配置
    module:{
        rules:[
          //loader的配置 
          {
              test:/\.css$/,
            //   多个loader用use
            use:['style-loader','css-loader']
          },
          {
              test:/\.js$/,
            //   排除node_modules下的文件  相当于性能优化，不检查node_modules下的文件
            exclude:/node_modules/,
            // 只检查src下的js文件  相当于性能优化，只检查src文件夹下的js文件
            include:resolve(__dirname,'src'),
            // 优先执行
            enforce:'pre',
            // 延后执行
            // enforce:'post',
            //   单个loader用loader
            loader:'eslint-loader',
            // 选项配置
            options:{}
          },
          {
            //  以下配置只会生效一个,详情请看 20.oneOf这一章
            oneOf:[]
          }
        ]
    },
    // plugins
    plugins:[
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)
        // 如果有这样的需求 ，需要有结构的html文件，需要加配置，template
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源(JS/CSS)
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        })

    ],
    // 模式
    mode:'development',
    // mode:'production',

    // 解析模块的规则
    resolve:{
      // 配置解析模块的路径别名: 优点是 简写路径, 缺点:路径没有提示
      alias:{
         $css: resolve(__dirname,'src/css')
      }
  }
}