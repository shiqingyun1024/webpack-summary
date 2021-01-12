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

            /*
              正常来讲，一个文件只能被一个loader处理。
              当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
              先执行eslint，再执行babel，因为babel是把es6转化为es5,转化之后再做eslint检查就没有意义了，先做eslint检查，就可以立马改正。
              enforce:'pre'  用这个配置代表优先执行
              */ 

            // js的语法检查，eslint-loader
            {
                // 需要在package.json中的eslintConfig进行配置 -->airbnb规则
                test:/\.js$/,
                exclude:/node_modules/,
                // 优先执行
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                    //  自动修复eslint的错误
                      fix:true
                }
            },
            // js的兼容性处理  babel-loader @babel/core @babel/preset-env
            // 需要做兼容性的就做：按需加载。 --> core-js
            {
                // 需要在package.json中的eslintConfig进行配置 -->airbnb规则
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    // 预设：指示babel做怎样的兼容性处理。
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns:'usage',//指定按需加载
                                // 指定core-js版本
                                corejs:{
                                    version:3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets:{
                                    chrome:'60',
                                    firefox:'60',
                                    ie:'9',
                                    safari:'10',
                                    edge:'17'

                                }
                            }

                        ]
                    ]
                }
            },
            // 处理图片资源处理css、sass、less等文件中的img图片 不过这个loader处理不了在html中img图片，例如：<img src="./images/vue1.jpeg" />，先要用html-loader负责先引入图片，然后由url-loader处理。
            //  url-loader是处理文件中引入的图片路径的，如：background-image: url('./images/vue1.jpeg');  
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                // 使用单个loader
                // 下载url-loader file-loader   url-loader要依赖于file-loader，所以也要下载file-loader
                loader: 'url-loader',
                // 进行配置
                options: {
                    // 图片大小小于8kb，就会被base64处理（一般都处理8~12kb及以下的图片）
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 10 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出现问题，[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    // 给图片进行重命名
                    // [hash:8]取图片的hash的前8位
                    // [ext]取文件原来的扩展名
                    name:'[hash:8].[ext]',
                    // 输出到build下面的imgs文件夹中
                    outputPath:'imgs'
                },
            },

            {
                test: /\.html$/,
                // 处理html文件中的img图片，负责引入img，从而能被url-loader进行处理。
                loader: 'html-loader'
            },

            // 处理其他资源
            {
                exclude:/\.(js|css|less|html|jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    outputPath:'media',
                    name:'[hash:8].[ext]'
                }
            }
        ]
    },
    // plugin插件的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码的设置
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
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
    // 模式,生产模式会自动压缩js代码
    mode: 'production'
}