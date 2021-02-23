const {resolve} = require('path');
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'build')
    },
    mode:'development'
}