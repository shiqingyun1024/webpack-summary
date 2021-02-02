const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 把css单独抽离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// PWA
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/*
  PWA：渐进式网络开发应用程序（离线可访问）
    需要借助workbox这个开源插件
     workbox ---> workbox-webpack-plugin
*/


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
        loader: 'postcss-loader'
    }
]

// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry: {
        index: './src/js/index.js'
    },
    // 出口文件
    output: {
        // filename:'built.js',
        filename: 'js/[name].[contenthash:8].js',
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
                test: /\.less$/,
                use: [...commonCssLoader,
                    // 处理less资源，把less转化为css
                    'less-loader'
                ]
            },
            // 处理css中的图片资源
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/,
                // 下载url-loader file-loader   url-loader要依赖于file-loader，所以也要下载file-loader
                loader: 'url-loader',
                // 进行配置
                options: {
                    // 图片大小小于8kb，就会被base64处理（一般都处理8~12kb及以下的图片）
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出现问题，[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:8]取图片的hash的前8位
                    // [ext]取文件原来的扩展名
                    name: '[hash:8].[ext]',
                    // 输出到build下面的imgs文件夹中
                    outputPath: 'imgs',
                    // pubilc代表是绝对路径，这样css和html加载的时候都是绝对路径，src的值就是publicPath+name
                    publicPath: '/build/imgs/'
                }
            },
            /*
            语法检查：eslint-loader  eslint库
            注意：只检查自己写的源代码，第三方的库是不用检查的
            设置检查规则：
            在package.json中eslintConfig中设置
            "eslintConfig":{
                "extends":"airbnb-base"
            }
            airbnb --> 需要三个库 eslint-config-airbnb-base  eslint  eslint-plugin-import.
            所以要安装：eslint-loader eslint-config-airbnb-base  eslint  eslint-plugin-import
            */
            // {
            //     test: /\.js$/,
            //     // 排除第三方的检查
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         //  自动修复eslint的错误
            //         fix: true
            //     }
            // },
            // js的兼容性处理  babel-loader @babel/core @babel/preset-env
            // 需要做兼容性的就做：按需加载。 --> core-js
            {
                // 需要在package.json中的eslintConfig进行配置 -->airbnb规则
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    /*
                       开启多进程打包.  有利有弊
                       其中进程启动大概为600ms，进程通信也有开销。
                       只有工作消耗时间比较长，才需要多进程打包。
                       平时js文件相对多一些，js进行babel-loader时花费的时间越长，使用进程打包的效果越明显。

                       放在某一个loader的后面，这样就会对前面的loader进行多进程打包。
                    */ 
                    // 'thread-loader',
                    {
                        loader: 'thread-loader',
                        options:{
                            workers: 2 // 设置进程，这里是2个
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示babel做怎样的兼容性处理。
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',//指定按需加载
                                        // 指定core-js版本
                                        corejs: {
                                            version: 3
                                        },
                                        // 指定兼容性做到哪个版本浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
        
                                        }
                                    }
        
                                ]
                            ],
                            // 开启babel缓存 ===== 为什么要开启缓存，因为假如这个项目中有100个js文件，但是我只改其中一个，这个时候另外99个文件就不需要重新打包了，直接使用缓存即可，这样打包构建速度更快更好。
                            // 第二次构建时，会读取之前的缓存。
                            cacheDirectory: true
                        }
                    }
                ]
            },
            // 处理html中的图片资源
            {
                test: /\.html$/,
                // 处理html文件中的img图片，负责引入img，从而能被url-loader进行处理。
                loader: 'html-loader'
            },
            // 处理其他资源
            {
                exclude: /\.(js|css|less|html|jpg|png|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[hash:8].[ext]'
                }
            }
        ]
    },
    // 插件plugins的配置
    plugins: [
        // 复制html文件，并把每次生成的js和css引入html文件中
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码的设置
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        // 每次打包前先清空build
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        }),
        // 指定抽离的文件名和路径
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:8].css'
        }),
        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin(),
        // 拷贝文件
        new CopyWebpackPlugin(
            // patterns: [{
            [{
                from: resolve(__dirname, './doc'),
                to: 'doc',
                ignore: ['.*']
            }]
        ),
        new WorkboxWebpackPlugin.GenerateSW({
            /*
              1. 帮助serviceworker快速启动
              2. 删除旧的serviceworker

              生成一个serviceworker配置文件，通过这个配置文件去注册serviceworker
            */ 
            clientsClaim:true,
            skipWaiting:true
        })
    ],
    // 模式
    mode: 'production',
    devtool: 'source-map'
}