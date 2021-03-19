const Plugin1 = require('./plugins/Plugin1');
const {resolve} = require('path');

module.exports = {
    // 入口文件
    entry:'./src/index',
    // 出口文件
    output:{
        filename:'js/bulit.js',
        path:resolve(__dirname,'build')

    },
    // loader的配置
    module:{
        rules:[

        ]
    },
    // 插件的配置
    plugins:[
        new Plugin1()
    ],
    // 模式
    mode:'development'
}