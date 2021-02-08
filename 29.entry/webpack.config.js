/*
 loader: 1、下载  2、使用（配置loader）
 plugins：1、下载 2、引入  3、使用
*/ 
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
  entry: 入口起点
   1. string ---> './src/index.js'
      单入口
      打包形成一个chunk。 输出一个bundle文件。
      此时chunk的名称默认是main
   2. array ---> ['./src/index.js','./src/add.js']
      多入口
      所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件。
      -->只有在HMR功能中让html热更新生效~
   3. object
      多入口
      有几个入口文件就形成几个chunk，输出几个bundle文件
      此时chunk的名称是key


   ---> 特殊用法
   {
       // 所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件。
       index:['./src/index.html','./src/count.js'],
       // 形成一个chunk，输出一个bundle文件
       add:'./src/add.js'
   }   

*/ 
module.exports={
    // 入口文件
    // entry:'./src/index.js',
    // entry:['./src/index.js','./src/add.js'],
    entry:{
        index:'./src/index.js',
        count:'./src/count.js'
    },
    // 出口文件
    output:{
        filename:'[name].[contenthash:8].js',
        path:resolve(__dirname,'build')
    },
    // loader
    module:{
        rules:[
     //loader的配置 
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
        })

    ],
    // 模式
    mode:'development'
    // mode:'production'
}