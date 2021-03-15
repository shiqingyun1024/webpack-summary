// loader 本质上是一个函数
// content是文件的内容，map是文件的映射信息，meta是文件的元信息

// 同步loader  异步loader的写法见loader2.js
// module.exports = function(content,map,meta){
//     console.log(111);
//     return content;
// }

// 同步loader 的另外一种写法 使用this.callback来代替return
module.exports = function(content,map,meta){
    console.log(111);
    // 有没有错误，没有就传null，  map,meta这两个参数是可选参数
    this.callback(null,content,map,meta)
}


// pitch方法是按照webpack.config.js中的use顺序从上往下执行的，所以先打印pitch 111
module.exports.pitch = function(){
    console.log('pitch 111');
}
