const {resolve} = require("path");
// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/built.js',
        path: resolve(__dirname,'build')
    },
    // loader的配置
    module:{
       rules:[

       ]
    },
    // plugins插件的配置
    plugins:[

    ],
    // 模式
    mode:'development'
}