// loader 本质上是一个函数
// content是文件的内容，map是文件的映射信息，meta是文件的元信息
module.exports = function(content,map,meta){
    console.log(content);
    return content;
    

}