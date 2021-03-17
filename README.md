## webpack-summary
## webpack学习系列
### 01 前端资源构建工具，

```
其实webapck是一个大的构建工具，包含了之前许多小的构建工具（处理css的，处理图片的），之前小的构建工具比较多，不容易维护。现在webpack都包含了，只需要维护webpack即可。

分析入口文件--->形成依赖关系树状图---->根据依赖关系树状图中的接入顺序依次引入进来---->形成chunk(代码块)---->再对chunk(代码块)进行各项处理，比如把less编译成css，把es6编译成浏览器能识别的es5等等---->这个进行各项处理的过程就叫打包---->打包之后将处理好的资源输出出去---->输出的东西叫bundle(会输出output配置的出口文件中)。
以上的流程主要是理解chunk和bundle这两个概念。
同时理解webpack为什么称为静态模块打包器。
用画图工具画出来
```

### 02 webpack初体验

```
先安装webpack
npm i webpack webpack-cli -g   // 全局安装一下webpack
npm i webpack webpack-cli -D  //  当前目录下安装 webpack

安装的时候的采坑点：
如果你webpack和webpack-cli是局部安装的，想要使用webpack命令必须进入node_modules/.bin/webpack才能执行webpack命令，
.bin目录包含的是一系列可以执行的命令，但是如果你是全局安装的webpack-cli，就不需要进入bin目录，webpack就能够寻找到它的命令路径了。
执行webpack的命令时，如果是生产环境的打包命令，代码会自动进行压缩。
```

### 03 打包样式资源
```
主要用到了style-loader，css-loader，less-loader，从右往左，或者从下往上执行，
less-loader是把less文件转化为css文件，
css-loader是把css文件转化为js文件，
style-loader是把css样式通过添加style标签的形式引入到html中。
```

### 04 打包html资源
```
主要用到html-webpack-plugin，它的主要作用是
功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)
如果有这样的需求 ，需要有结构的html文件，需要加配置--->template
template:'./src/index.html'
复制./src/index.html文件，并自动引入打包输出的所有资源(JS/CSS)
```

### 05 打包图片资源
```
打包样式资源主要用到url-loader，因为url-loader依赖于file-loader，所以也要安装file-loader。
对于html中的img图片的处理，需要安装html-loader，html-loader用于把img引入，会转化为如下的格式，如：require(“images/vue.jpg”);然后由url-loader进行处理。
因为html-loader是commonjs格式，url-loader是es6Module格式，所以要在url-loader中进行处理 esModule:false
```

### 06 打包其他资源
```
打包其他资源主要是包括字体图标等，主要用file-loader来处理这些资源，原理一般都是直接拷贝到打包库里面，不进行任何转化处理。
同时使用clean-webpack-plugin来清除build文件夹，这样每次打包，里面都是最新的打包文件，把之前的删除掉了。
通过cleanAfterEveryBuildPatterns来设置打包时清空的文件夹。
cleanAfterEveryBuildPatterns:['build']
```

### 07 devServer
```
开发服务器，这个在开发环境中非常有用，节省了很多不必要的操作，实现自动化操作。
开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~~）
特点：只会在内存中编译打包，不会有任何输出
（如果直接运行npx webpack-dev-server，是没有输出的，不会生成build文件夹，因为是在内存中编译打包。运行webpack会有输出，输出build文件夹）
启动devServer指令为：npx webpack-dev-server，因为没有全局安装，所以用npx webpack-dev-server，如果全局安装了，可以直接webpack-dev-server，但是没有必要。
webapck全局安装了，所以可以直接用webpack，如果没有全局安装，就用 npx webpack
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
```

### 08 开发环境配置
```
把上面7项整合起来，就是开发环境的配置了

开发环境配置：能让代码运行即可
运行命令：webpack
npx webpack-dev-server

webpack运行之后将打包结果输出，
webpack-dev-server在内存中编译，不会输出结果。

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
```

### 构建环境介绍：
```
开发环境：
生产环境所做的事情：1、css转化js，js文件太大，加载太慢，所以需要把css抽离出来，style标签加载css文件会有白屏现象，
所以生产环境解决这个问题。这个问题09.提取css成单独文件会解答。
2、代码体积很大，进行压缩。
3、兼容性处理等。
4、等等
```

### 09.提取css成单独文件
```
为什么提取css成单独文件，因为css转化js，js文件太大，加载太慢，所以需要把css抽离出来。
mini-css-extract-plugin就是专门解决这个问题的，把css从js中提取出来
首先，引入const MiniCssExtractPlugin = require('mini-css-extract-plugin');
然后在plugins进行配置
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

MiniCssExtractPlugin.loader这个配置很重要，
它取代了style-loader，把css从js中提取到一个css文件中。
<link href="css/built.css" rel="stylesheet">
提取出来之后html-webpack-plugin会通过link标签把它引入打包后的html中，这样就不会存在白屏现象了。
```

### 10.css兼容性处理
```
兼容性处理用postcss
css兼容性处理：postcss--->postcss-loader postcss-preset-env
其中postcss-preset-env用于识别某些环境，从而加载指定的配置。能够让兼容性精确到每一个版本。
postcss-preset-env帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式。
browserslist配置如下：
"browserslist":{
  "development":[
     // 开发环境 如果想用开发环境就需要设置node环境变量：process.env.NODE_ENV = "development"
     // last 1 chrome version意思是兼容最近的一个chrome浏览器版本
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  // 生产环境：默认是看生产环境
  "production":[
     ">0.2%",// 大于99.8%的浏览器
     "not dead",
     "not op_mini all"
   ]
},

//  使用loader有两种方式，1、使用loader的默认配置。2、修改loader的配置  
//  使用loader的默认配置，如下
//  ’postcss-loader‘  
//  修改loader的配置
{
  loader: 'postcss-loader',
  /* options: {
      // 这个地方写postcss，千万别写成postcss-loader了
      ident: 'postcss',
      // 记住这里返回的是数组，一定要记住，刚开始写成对象了
      plugins: () => [
       // postcss的插件
      require('postcss-preset-env')()
       ]
    } */
}

如果按照上面写，会报错，如下：
报错：ValidationError: Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'plugins'. These properties are valid:
具体怎么解决，请看我的这篇博客。https://blog.csdn.net/xiaolinlife/article/details/112056848
```

### 11.压缩css
```
压缩css的插件是：
optimize-css-assets-webpack-plugin
直接使用：
// 压缩css
new OptimizeCssAssetsWebpackPlugin()
```

### 12.js的语法检查
```
语法检查：eslint-loader eslint库
注意：只检查自己写的源代码，第三方的库是不用检查的
设置检查规则：
在package.json中eslintConfig中设置
"eslintConfig":{
  "extends":"airbnb-base"
}
airbnb --> 需要三个库 eslint-config-airbnb-base eslint eslint-plugin-import.
所以要安装：eslint-loader eslint-config-airbnb-base eslint eslint-plugin-import
{
  test:/\.js$/,
  // 排除第三方的检查
  exclude:/node_modules/,
  loader:'eslint-loader',
  options:{
    // 自动修复eslint的错误
    fix:true
  }
}
```

### 13.js的兼容性处理
```
babel-loader，这个是经常能用到的。
  js的兼容性处理-- babel-loader @babel/core @babel/preset-env,然后下面是三种解决兼容性的方案，分别下载不同的包
  1、基本的js兼容性处理 ---> @babel/preset-env
     问题：只能转换基本语法，如prmise不能转换
  2、全部js兼容性处理 --> @babel/polyfill
     问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
  3、需要做兼容性的就做：按需加载。 --> core-js
 {
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
          useBuiltIns:'usage',
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
```               



### 14.js的压缩
```  
// 生产环境下会自动压缩js代码
mode:'production'
```  

### 15.html的压缩
```  
new HtmlWebpackPlugin({
    template:'./src/index.html',
    // 压缩html代码的设置
    minify:{
      // 移除空格
      collapseWhitespace:true,
      // 移除注释
      removeComments:true
    }
})
```  

### 16.生产环境配置
``` 
前面各种配置的集合，具体请看代码。
``` 

### 17.优化配置介绍
``` 
* 开发环境性能优化
* 生产环境性能优化

开发环境性能优化
* 优化打包构建速度 HMR
* 优化代码调试 source-map

生产环境性能优化
* 优化打包构建速度
* 优化代码运行的性能
``` 

### 18.HMR
``` 
HMR: hot module replacement 热模块替换/模块热替换
  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
  极大的提高了构建速度

  样式文件：可以使用HMR功能：因为style-loader内部实现了~
  js文件：默认不能使用HMR功能 --->需要修改js代码，添加支持HMR功能的代码（module.hot.accept）
      注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。因为入口js文件会把其他的js文件引入进来，一旦发生改变，会重新引入，重新进行加载。
  html文件：默认不能使用HMR功能，同时会导致问题：html文件改变不能自动刷新页面~ （html不要做HMR，因为html文件只有一个，这个一个改变了，每次都会重新打包）
      html文件改变不能自动刷新页面解决：修改entry入口，将html文件引入。将entry改成一个数组的形式，如下entry
``` 
### 19.source-map
``` 
source-map:一种提供源代码到构建后代码的映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）非常利于调试，去找错误的原因
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

  source-map: 外部
      错误代码的准确信息 和 源代码的错误位置
  inline-source-map: 内联 
      只生成一个内联source-map 
      错误代码的准确信息 和 源代码的错误位置
  hidden-source-map: 外部
      错误代码的错误原因，但是没有错误位置
      不能追踪源文件错误，只能提示到构建后代码的错误位置。（为了隐藏源代码）
  eval-source-map: 内联  
      每一个文件都生成对应的source-map，都在eval函数中
      错误代码的准确信息 和 源代码的错误位置
  nosources-source-map: 外部
      错误代码的准确信息，但是没有任何源代码信息（为了隐藏源代码）
  cheap-source-map: 外部
       错误代码的准确信息 和 源代码的错误位置
       只能精确到行，不知道这一行哪块出错了，其他的可以。
  cheap-module-source-map: 外部
        错误代码的准确信息 和 源代码的错误位置
        只能精确到行，不知道这一行哪块出错了，其他的可以。
        module会将loader的source map也加进来。
  内联和外部的区别：1、外部生成了文件(如build.map.js)，内联没有(内联是把相关的映射代码加到了built.js里面)  2、内联构建速度更快
  
  开发环境：速度快，调试更友好
  速度快(eval>inline>cheap>....)
    eval-cheap-source-map
    eval-source-map
  调试更友好
    source-map
    cheap-module-source-map
    cheap-source-map

   ---> 得出结论：eval-source-map（封装的脚手架中都采用的这种如：vue-cli）
   
  生产环境：源代码要不要隐藏？调试要不要更友好
     内联会让代码体积变大，所以在生产环境不用内联
     隐藏源代码：hidden-source-map（只隐藏源代码，会提示构建后代码错误信息）和nosources-source-map（全部隐藏）
     
     调试友好的话：source-map

      --->结论：source-map
``` 
### 20.oneOf
``` 
 oneOf让文件只匹配到下面的其中一个，提升了构建速度，不用每一个都遍历进行匹配规则了。优化了生产环境的构建速度。
 以下loader只会匹配一个
注意：不能有两个配置处理同一种类型文件，所以需要把eslint-loader配置提到外面。
```
### 21.缓存
```
缓存：
    babel缓存
       cacheDirectory:true
       --> 让第二次打包构建速度更快
    文件资源缓存
       hash：每次webpack构建时会生成一个唯一的hash值.
           问题：因为js和css同时使用一个hash值。
             如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
       chunkhash: 根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash就一样。
           问题：js和css的hash值还是一样的
              因为css是在js中被引入的，所以同属于一个chunk
       contenthash：根据文件的内容生成hash值。不同文件hash值一定是不一样的。所以一般都用contenthash      
            ---> 让代码上线运行缓存更好使用
```
### 22.tree-shaking
```
树摇
1、生产环境
2、遵循 ES6 module
```
### 23.code-split
```
代码分割
// 单入口  单页面应用程序会这样写，如果是单文件的话，也想做代码分割，需要写在js里面。
1、单页面应用 可以将node_modules中代码单独打包成一个chunk最终输出，打包的时候自己写的单独打成一个包，第三方文件单独打成一个包
2、多页面应用 自动分析多入口文件中，有没有公共的文件，如果有，会打包成单独的一个文件
3、巨大的js文件拆分成许多js文件，可以并行加载，速度更快。
optimization:{
  splitChunks:{
    chunks:'all'
  }
},
```
### 24.lazy-loading
```
懒加载~  懒加载的前提是先进行代码分割。当文件需要使用时才加载~
预加载 webpackPrefetch:true,会在使用之前，提前加载js文件。
正常加载可以认为是并行加载（同一时间加载多个文件）预加载 Prefetch 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源。这样更加灵活一点。不过兼容性不太好。
import(/* webpackChunkName:'test', webpackPrefetch:true*/ './test')
  // import(/* webpackChunkName:'test'*/ './test')
.then(({mul})=>{
  console.log(mul(4,5))
})
.catch(error=>{
  console.log(error);
})
```
### 25.PWA
```
PWA：渐进式网络开发应用程序（离线可访问）需要借助workbox这个开源插件
workbox ---> workbox-webpack-plugin
new WorkboxWebpackPlugin.GenerateSW({
  /*
    1. 帮助serviceworker快速启动
    2. 删除旧的serviceworker
    生成一个serviceworker配置文件，通过这个配置文件去注册serviceworker
  */ 
  clientsClaim:true,
  skipWaiting:true
})
```
### 26.多进程打包
```
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
            // 开启babel缓存 ===== 为什么要开启缓存，
            // 因为假如这个项目中有100个js文件，但是我只改其中一个，这个时候另外99个文件就不需要重新打包了，
            // 直接使用缓存即可，这样打包构建速度更快更好。
            // 第二次构建时，会读取之前的缓存。
            cacheDirectory: true
         }
        }
    ]
  },
```
### 27.externals
```
通过这种方式引入的依赖库，不需要webpack处理，编译进文件中，在我们需要，使用它的时候可以通过CMD、AMD、或者window全局方式访问。
比如我们在index.html用CDN的方式引入jquery，webpack编译打包时不处理它，却可以引用到它。
<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
使用
const $ = require("jquery")
$("#content").html("<h1>hello world</h1>")
配置
externals:{
  // 忽略库名 -- npm包名   拒绝jQuery被打包进来
  jquery: 'jQuery'
}
```
### 28.dll
```
先创建 webpack.dll.js文件
内容如下：
/*
使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包,
好处是不用重复打包
当你运行webpack时，默认查找webpack.config.js 配置文件
需求：需要运行 webpack.dll.js 文件
   ---> webpack --config webpack.dll.js
*/ 
const {resolve} = require('path');
const webpack = require('webpack');
module.exports = {
    entry:{
        // 最终打包生成的[name]---->jquery
        // ['jquery'] --->要打包的库是jquery
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash:8]',//打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个manifest.json --> 提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash:8]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json'), // 输出文件路径
        })
    ],
    // 模式
    mode:'production'
}

webpack.config.js中关于dll的配置如下：
在plugins中的进行配置
// 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
new webpack.DllReferencePlugin({
  manifest:resolve(__dirname,'dll/manifest.json')
}),

```
### 29.entry
```
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

```
### 30.output
```
// 出口文件
    output:{
        // 文件名称 （指定名称+目录）
        filename:'js/[name].[contenthash:8].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,'build'),
        // 所有资源引入公共路径前缀 ---> 'imgs/a.jpg' --> '/imgs/a.jpg' 一般用于生产环境
        publicPath:'./',
        // 非入口chunk的名称
        chunkFilename:'js/[name]_chunk.js',
        // library的作用  表示整个库向外暴露的变量名  main.js中的window["main"] =中的"main"
        library:'[name]',
        // libraryTarget表示变量名添加到哪个上  main.js中的window["main"] =中的window   这样其他的js文件可以使用main.js中的方法
        libraryTarget:'window',
        // libraryTarget:'commonjs' // 这个时候main.js中的开头是 exports["main"]
    },
```
### 31.module
```
module里面的配置
// 单个loader用loader
loader:'eslint-loader',
// 多个loader用use
use:['style-loader','css-loader']

module的大概配置如下：
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
```
### 32.resolve
```
// 解析模块的规则
    resolve:{
      // 配置解析模块的路径别名: 优点是 简写路径, 缺点:路径没有提示
      alias:{
         '$css': resolve(__dirname,'src/css')
      },
      // 配置省略文件路径的后缀名,在文件中引入其他文件的时候可以省略文件名后缀
      extensions:['.js','.json','.css'],
      // 告诉webpack解析模块是去找哪个目录，当然也可以直接写成绝对路径 resolve(__dirname,'node_modules') 这种形式
      modules:[resolve(__dirname,'node_modules'),'node_modules']
  }
```
### 33.devServer详解
```
// 开发服务器
    devServer:{
        // 运行代码的目录
        contentBase: resolve(__dirname,'build'),
        // 监视 contentBase目录下的所有文件，一旦文件变化就会reload
        watchContentBase:true,
        watchOptions:{
           // 忽略文件，这样即使文件发生变化化，也不会reload
           ignored:/node_modules/  
        },
        // 启动gzip压缩， 压缩之后代码体积变小，运行速度就会加快
        compress:true,
        // 端口号
        port:5000,
        // 域名
        host:'localhost',
        // 自动打开浏览器
        open:true,
        // 开启HMR功能
        hot:true,
        // 不要显示启动服务器日志信息
        clientLogLevel:'none',
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet:true,
        // 如果出错了，不要全屏提示~
        overlay:false,
        // 服务器代理 -->解决开发环境跨域问题
        proxy:{
            // 一旦devServer(5000)服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器(3000)上
            '/api':{
                target:'http://localhost:3000',
                // 发送请求时，请求路径重写: 将/api/xxx --> /xx (去掉/api)
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
```
### 34.optimization
```
// 在生产环境下研究optimization才会有意义
    optimization:{
        // 代码分割
        splitChunks:{
            chunks:'all',
            // 下面都是默认值，可以不写~
            /* minSize: 30*1024, //分割的chunk最小为30kb，只有超过30kb才会进行分割
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

            }*/
        },
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        // 解决: 修改a文件导致b文件的contenthash变化
        runtimeChunk:{
            name: entrypoint=>`runtime-${entrypoint.name}`
        },
        minimizer:[
            // 配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache:true,
                // 开启多进程打包
                parallel:true,
                // 启动source-map
                sourceMap:true

            })
        ]
    }
```
### 35.webpack5的使用
```
webpack5中很多都是默认配置项，不用写，先做了一个简单的配置
如下：
module.exports = {
    mode:'production'
}
相当于webapck4.0中这样的配置
const {resolve} = require('path');
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'build')
    },
    mode:'production'
}

所以webpack5.0比4.0简洁了很多。后面我会专门总结一下webpack5.0，项目名字就叫webpack5.0-summary

```



# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR 热模块替换，一个文件变了，只打包这一个，其他的都使用之前的缓存，对于css文件，style-loader内置了HMR
* 优化代码调试
  * source-map 使得开发环境下调试更加友好


## 生产环境性能优化
* 优化打包构建速度
  * oneOf  优化loader，让文件只适配其中的一个loader，就不往下适配了，优化速度，但是不能把文件要用到的两个或多个放在一个oneOf里面。
  * babel缓存  优化打包构建速度。
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash)
  * tree shaking  满足两个条件 1、es6模块化  2、production环境 production环境下会自动压缩代码，UglifyJS这个插件在压缩时，会自动去掉没有用到的代码。
  * code split 代码分割
  * 懒加载、预加载  js代码。
  * pwa


  ### 37.React最新版本脚手架的详细配置

  ### 38.Vue最新版本脚手架的详细配置
  ```
  检查vue-cli中的配置的命令，并输出到某一个文件中(例如下面是输出到webpack.dev.js中)
  vue inspect --mode=development > webpack.dev.js
  所以研究vue-cli中开发环境的配置看webpack.dev.js文件就可以了

  vue inspect --mode=production > webpack.prod.js
  所以研究vue-cli中生产环境的配置看webpack.prod.js文件就可以了

  ```

  ### 39.loader
  ```
  loader的原理，loader本质上是一个函数
  同步loader的写法
  异步loader的写法
  模仿babel-loader写了一个babelLoader
  ```


  ### 40.基于webpack5自定义loader、自定义plugin等

  ```
  37、38、39章基于的环境参数：
      环境参数：
          @vue/cli  v4.5.7
          create-react-app v3.4.1
          webpack v5.1.3
          nodejs v12.17.0
  ```
