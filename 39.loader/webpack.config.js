const path = require('path');


// webpack5.0中默认使用了entry和output的配置
module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,
                // loader:path.resolve(__dirname,'loaders','loader1')
                // 因为在resolveLoader中配置了寻找loader的路径，所以可以直接写成下面这样
                // loader:'loader1'

                // 如果有多个loader的话，要按照顺序从下到上，从左往右
                use:[
                    'loader1',
                    'loader2',
                    'loader3'
                ]
            }

        ]
    },
    // resolveLoader 一个解析loader的配置选项   loader的解析规则
    resolveLoader:{
        // 定义去哪个模块下找loader
       modules:[
           'node_modules',
           path.resolve(__dirname,'loaders')
       ]
    },
    mode:'development'
}