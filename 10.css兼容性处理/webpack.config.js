const {
    resolve
} = require('path');
// 处理index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 从js中抽取css，抽到css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除打包构建后的文件夹build
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

// 设置nodejs的环境变量
process.env.NODE_ENV = 'development';
// webpack是基于node环境，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry: './src/js/index.js',
    // 出口文件
    output: {
        // 文件名
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')

    },
    // loader 配置
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                //  把样式从js抽取出来，用style标签加载到html文件中
                //  'style-loader'
                // MiniCssExtractPlugin.loader用于把css从js中抽离出来，抽取到css文件里面，所以就用不到style-loader了。
                MiniCssExtractPlugin.loader,
                'css-loader',
                /*
                    css兼容性处理：postcss--->postcss-loader postcss-preset-env
                    postcss-preset-env帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                    
                    "browserslist":{
     "development":[
        开发环境 如果想用开发环境就需要设置node环境变量：process.env.NODE_ENV = "development"
    //   last 1 chrome version意思是兼容最近的一个chrome浏览器版本
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     生产环境：默认是看生产环境
     "production":[
       ">0.2%",// 大于99.8%的浏览器
       "not dead",
       "not op_mini all"
     ]
  },
                    */
                //  使用loader有两种方式，1、使用loader的默认配置。2、修改loader的配置  
                //  使用loader的默认配置，如下
                //  ’postcss-loader‘  
                //  修改loader的配置
                {
                    loader: 'postcss-loader',
                    options: {
                        // 这个地方写postcss，千万别写成postcss-loader了
                        ident: 'postcss',
                        // 记住这里返回的是数组，一定要记住，刚开始写成对象了
                        plugins: () => [
                            // postcss的插件
                            require('postcss-preset-env')()

                        ]
                    }
                }
            ]
        }]
    },
    // plugin的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        }),
        // 提取js文件的css文件
        new MiniCssExtractPlugin({
            // 对输出的文件进行重命名
            filename: 'css/built.css'
        })

    ],
    // 模式
    mode: 'development'
}