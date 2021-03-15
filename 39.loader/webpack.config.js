const path = require('path');


// webpack5.0中默认使用了entry和output的配置
module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,
                loader:path.resolve(__dirname,'loaders','loader1')
            }

        ]
    }
}