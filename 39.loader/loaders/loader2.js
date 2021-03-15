// loader 本质上是一个函数
// content是文件的内容，map是文件的映射信息，meta是文件的元信息
// 同步loader
// module.exports = function(content,map,meta){
//     console.log(222);
//     return content;
// }
// 异步loader
module.exports = function(content,map,meta){
    console.log(222);
    // 异步函数async，当使用callback的时候才会往下执行
    const callback = this.async();
    setTimeout(()=>{
        callback(null,content);
    },3000);
}

// pitch方法是按照webpack.config.js中的use顺序从上往下执行的，所以再打印pitch 222
module.exports.pitch = function(){
    console.log('pitch 222');
}