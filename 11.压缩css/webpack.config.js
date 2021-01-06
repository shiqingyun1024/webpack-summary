const {resolve} = require('path')
// webpack基于node，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output:{
        filename:'js/index.js',
        path: resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 把css转化为js
                    'css-loader',
                ]
            }
        ]
    },
    // plugins的配置
    plugins:[

    ],
    // 模式
    mode:'development'
}