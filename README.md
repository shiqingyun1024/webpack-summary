### webpack-summary
### webpack学习系列
#### 01 前端资源构建工具，
其实webapck是一个大的构建工具，包含了之前许多小的构建工具（处理css的，处理图片的），之前小的构建工具比较多，不容易维护。现在webpack都包含了，只需要维护webpack即可。

分析入口文件---形成依赖关系树状图----根据依赖关系树状图中的接入顺序依次引入进来----形成chunk(代码块)----再对chunk(代码块)进行各项处理，比如把less编译成css，把es6编译成浏览器能识别的es5等等----这个进行各项处理的过程就叫打包----打包之后将处理好的资源输出出去----输出的东西叫bundle(会输出output配置的出口文件中)。
以上的流程主要是理解chunk和bundle这两个概念。
同时理解webpack为什么称为静态模块打包器。
用画图工具画出来

#### 02 webpack初体验

先安装webpack
npm i webpack webpack-cli -g   // 全局安装一下webpack
npm i webpack webpack-cli -D  //  当前目录下安装 webpack

安装的时候的采坑点：
如果你webpack和webpack-cli是局部安装的，想要使用webpack命令必须进入node_modules/.bin/webpack才能执行webpack命令，.bin目录包含的是一系列可以执行的命令，但是如果你是全局安装的webpack-cli，就不需要进入bin目录，webpack就能够寻找到它的命令路径了。

执行webpack的命令时，如果是生产环境的打包命令，代码会自动进行压缩。

#### 03 打包样式资源
主要用到了style-loader，css-loader，less-loader。，从右往左，或者从下往上执行，less-loader是把less文件转化为css文件，css-loader是把css文件转化为js文件，style-loader是把css样式通过添加style标签的形式引入到html中。

#### 04 打包html资源
主要用到html-webpack-plugin，它的主要作用是<br>
// 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)<br>
// 如果有这样的需求 ，需要有结构的html文件，需要加配置，template<br>
template:'./src/index.html'<br>
// 复制./src/index.html文件，并自动引入打包输出的所有资源(JS/CSS)<br>

#### 05 打包图片资源
打包样式资源主要用到url-loader，因为url-loader依赖于file-loader，所以也要安装file-loader。<br>
对于html中的img图片的处理，需要安装html-loader，html-loader用于把img引入，会转化为如下的格式，如：require(“images/vue.jpg”);然后由url-loader进行处理。<br>
因为html-loader是commonjs格式，url-loader是es6Module格式，所以要在url-loader中进行处理 <br>esModule:false

#### 06 打包其他资源
打包其他资源主要是包括字体图标等，主要用file-loader来处理这些资源，原理一般都是直接拷贝到打包库里面，不进行任何转化处理。
同时使用clean-webpack-plugin来清除build文件夹，这样每次打包，里面都是最新的打包文件，把之前的删除掉了。通过cleanAfterEveryBuildPatterns来设置打包时清空的文件夹。
cleanAfterEveryBuildPatterns:['build']

#### 07 devServer
开发服务器，这个在开发环境中非常有用，节省了很多不必要的操作，实现自动化操作。<br>
// 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~~）<br>
// 特点：只会在内存中编译打包，不会有任何输出（如果直接运行npx webpack-dev-server，是没有输出的，不会生成build文件夹，因为是在内存中编译打包。运行webpack会有输出，输出build文件夹）<br>
// 启动devServer指令为：npx webpack-dev-server，因为没有全局安装，所以用npx webpack-dev-server，如果全局安装了，可以直接webpack-dev-server，但是没有必要。<br>
// webapck全局安装了，所以可以直接用webpack，如果没有全局安装，就用 npx webpack<br>
// 一定要安装webpack-dev-server<br>
devServer: {<br>
// 项目构建后路径<br>
contentBase: resolve(__dirname, 'build'),<br>
// 启动gzip压缩<br>
compress: true,<br>
// 启动服务的端口号<br>
port: 3000,<br>
// 自动打开浏览器<br>
open:true<br>
}

#### 08 开发环境配置
把上面7项整合起来，就是开发环境的配置了<br>
/*
开发环境配置：能让代码运行即可<br>
运行命令：webpack<br>
npx webpack-dev-server<br>

webpack运行之后将打包结果输出，<br>
webpack-dev-server在内存中编译，不会输出结果。<br>
*/
// 其他资源,字体图标等<br>
{<br>
// 排除<br>
exclude: /\.(html|js|less|css|png|jpg|gif|jpeg)$/,<br>
loader: 'file-loader',<br>
options: {<br>
name: '[hash:8].[ext]',<br>
// 指定输出的文件夹名<br>
outputPath:'media'<br>
}<br>
}<br>
// 指定输出的文件名用outputPath

#### 构建环境介绍：
开发环境：<br>
生产环境所做的事情：1、css转化js，js文件太大，加载太慢，所以需要把css抽离出来，style标签加载css文件会有白屏现象，所以生产环境解决这个问题。这个问题09.提取css成单独文件会解答。<br>
2、代码体积很大，进行压缩。<br>
3、兼容性处理等。<br>
4、等等<br>

#### 09.提取css成单独文件
为什么提取css成单独文件，因为css转化js，js文件太大，加载太慢，所以需要把css抽离出来。<br>
mini-css-extract-plugin就是专门解决这个问题的，把css从js中提取出来<br>
首先，引入const MiniCssExtractPlugin = require('mini-css-extract-plugin');<br>
然后再plugins进行配置<br>
// 提取js文件的css文件
new MiniCssExtractPlugin({
// 对输出的css文件进行重命名
filename:'css/built.css'
})
在loader中进行配置：
// loader配置
module:{
rules:[
{
test:/\.css$/,
use:[
// 创建style标签，将样式放入
// 'style-loader',
// 这个loader取代style-loader。作用：提取js中的css成单独文件
MiniCssExtractPlugin.loader,
// 将css文件整合到js文件中
'css-loader'
]
}
]
},

MiniCssExtractPlugin.loader这个配置很重要，它取代了style-loader，把css从js中提取到一个css文件中。<br>
<link href="css/built.css" rel="stylesheet"><br>
提取出来之后html-webpack-plugin会通过link标签把它引入打包后的html中，这样就不会存在白屏现象了。

#### 10.css兼容性处理
兼容性处理用postcss<br>
css兼容性处理：postcss--->postcss-loader postcss-preset-env<br>
其中postcss-preset-env用于识别某些环境，从而加载指定的配置。能够让兼容性精确到每一个版本。<br>
postcss-preset-env帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式。<br>
browserslist配置如下：<br>
"browserslist":{<br>
  "development":[<br>
// 开发环境 如果想用开发环境就需要设置node环境变量：process.env.NODE_ENV = "development"<br>
// last 1 chrome version意思是兼容最近的一个chrome浏览器版本<br>
"last 1 chrome version",<br>
"last 1 firefox version",<br>
"last 1 safari version"<br>
],<br>
// 生产环境：默认是看生产环境<br>
"production":[<br>
">0.2%",// 大于99.8%的浏览器<br>
"not dead",<br>
"not op_mini all"<br>
]<br>
},<br>

//  使用loader有两种方式，1、使用loader的默认配置。2、修改loader的配置  <br>
                //  使用loader的默认配置，如下<br>
                //  ’postcss-loader‘  <br>
                //  修改loader的配置<br>
                {<br>
                    loader: 'postcss-loader',<br>
                    // options: {<br>
                    //     // 这个地方写postcss，千万别写成postcss-loader了<br>
                    //     ident: 'postcss',<br>
                    //     // 记住这里返回的是数组，一定要记住，刚开始写成对象了<br>
                    //     plugins: () => [<br>
                    //         // postcss的插件<br>
                    //         require('postcss-preset-env')()<br>
                    //     ]<br>
                    // }<br>
                }<br>

                如果按照上面写，会报错，如下：<br>
报错：ValidationError: Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.<br>
 - options has an unknown property 'plugins'. These properties are valid:<br>
具体怎么解决，请看我的这篇博客。https://blog.csdn.net/xiaolinlife/article/details/112056848<br>
<br>
#### 11.压缩css
压缩css的插件是：<br>
optimize-css-assets-webpack-plugin<br>
直接使用：<br>
// 压缩css<br>
new OptimizeCssAssetsWebpackPlugin()<br>


