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
主要用到html-webpack-plugin，它的主要作用是
// 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)
// 如果有这样的需求 ，需要有结构的html文件，需要加配置，template
template:'./src/index.html'
// 复制./src/index.html文件，并自动引入打包输出的所有资源(JS/CSS)

#### 05 打包图片资源
打包样式资源主要用到url-loader，因为url-loader依赖于file-loader，所以也要安装file-loader。
对于html中的img图片的处理，需要安装html-loader，html-loader用于把img引入，会转化为如下的格式，如：require(“images/vue.jpg”);然后由url-loader进行处理。
因为html-loader是commonjs格式，url-loader是es6Module格式，所以要在url-loader中进行处理 esModule:false

#### 06 打包其他资源
打包其他资源主要是包括字体图标等，主要用file-loader来处理这些资源，原理一般都是直接拷贝到打包库里面，不进行任何转化处理。
同时使用clean-webpack-plugin来清除build文件夹，这样每次打包，里面都是最新的打包文件，把之前的删除掉了。通过cleanAfterEveryBuildPatterns来设置打包时清空的文件夹。
cleanAfterEveryBuildPatterns:['build']

#### 07 devServer
开发服务器，这个在开发环境中非常有用，节省了很多不必要的操作，实现自动化操作。
// 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~~）
// 特点：只会在内存中编译打包，不会有任何输出（如果直接运行npx webpack-dev-server，是没有输出的，不会生成build文件夹，因为是在内存中编译打包。运行webpack会有输出，输出build文件夹）
// 启动devServer指令为：npx webpack-dev-server，因为没有全局安装，所以用npx webpack-dev-server，如果全局安装了，可以直接webpack-dev-server，但是没有必要。
// webapck全局安装了，所以可以直接用webpack，如果没有全局安装，就用 npx webpack
// 一定要安装webpack-dev-server
devServer: {
// 项目构建后路径
contentBase: resolve(__dirname, 'build'),
// 启动gzip压缩
compress: true,
// 启动服务的端口号
port: 3000,
// 自动打开浏览器
open:true
}

#### 08 开发环境配置
把上面7项整合起来，就是开发环境的配置了
/*
开发环境配置：能让代码运行即可
运行命令：webpack
npx webpack-dev-server

webpack运行之后将打包结果输出，
webpack-dev-server在内存中编译，不会输出结果。
*/
// 其他资源,字体图标等
{
// 排除
exclude: /\.(html|js|less|css|png|jpg|gif|jpeg)$/,
loader: 'file-loader',
options: {
name: '[hash:8].[ext]',
// 指定输出的文件夹名
outputPath:'media'
}
}
// 指定输出的文件名用outputPath
