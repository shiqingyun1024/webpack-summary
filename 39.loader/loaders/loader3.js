// loader 本质上是一个函数

// loader-utils是webpack为我们提供一个获取options的方法的库
const { getOptions } = require('loader-utils');

// content是文件的内容，map是文件的映射信息，meta是文件的元信息
module.exports = function(content,map,meta){
    console.log(333);
    return content;
}

// pitch方法是按照webpack.config.js中的use顺序从上往下执行的，所以最后打印pitch 333
module.exports.pitch = function(){
    console.log('pitch 333');
}