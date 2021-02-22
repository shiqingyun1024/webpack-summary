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
    mode:'production',

    // 解析模块的规则
    resolve:{
      // 配置解析模块的路径别名: 优点是 简写路径, 缺点:路径没有提示
      alias:{
         $css: resolve(__dirname,'src/css')
      },
      // 配置省略文件路径的后缀名,在文件中引入其他文件的时候可以省略文件名后缀
      extensions:['.js','.json','css'],
      // 告诉webpack解析模块是去找哪个目录，当然也可以直接写成绝对路径 resolve(__dirname,'node_modules') 这种形式
      modules:[resolve(__dirname,'node_modules'),'node_modules']
    },

    // 在生产环境下研究optimization才会有意义
    optimization:{
        // 代码分割
        splitChunks:{
            chunks:'all',
            minSize: 30*1024, //分割的chunk最小为30kb，只有超过30kb才会进行分割
            maxSize: 0, // 最大没有限制
            minChunks:1,// 要提取的chunk最少被引用1次
            maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
            maxInitialRequests: 3, // 入口js文件最大并行请求数量
            automaticNameDelimiter:'~', // 名称连接符
            name:true, // 可以使用命名规则
            cacheGroups:{  // 分割chunk的组
                // node_modules文件会被打包到vendors组的chunk中。 --> vendors~xxx.js
                // 一定要满足上面的公共规则，如：大小超过30kb，至少被引用一次。
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    // 优先级
                    priority: -10
                },
                default:{
                    // 要提取的chunk最少被引用2次
                    minChunks:2,
                    // 优先级
                    priority:-20,
                    // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
                    reuseExistingChunk:true
                }

            }
        }
    }
}