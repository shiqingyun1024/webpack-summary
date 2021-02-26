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
1、单页面应用 可以将node_modules中代码单独打包成一个chunk最终输出，打包的时候自己写的单独打成一个包，第三方文件单独打成一个包
2、多页面应用 自动分析多入口文件中，有没有公共的文件，如果有，会打包成单独的一个文件
3、巨大的js文件拆分成许多js文件，可以并行加载，速度更快。
optimization:{
  splitChunks:{
    chunks:'all'
  }
},
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
  