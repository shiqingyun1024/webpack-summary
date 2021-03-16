// loader 本质上是一个函数

// loader-utils是webpack为我们提供一个库(要npm自己安装一下),其中getOptions方法来专门获取options选项
const { getOptions } = require('loader-utils');
// 验证options中的选项是否符合规范
const { validate } = require('schema-utils')

const schema = require('./schema')

// content是文件的内容，map是文件的映射信息，meta是文件的元信息
module.exports = function(content,map,meta){
    const options = getOptions(this);
    console.log(333,options);

    // 校验options是否合法  接受三个参数，第一个是校验规则，第二个是获取的options选项，第三个是loader的名称，如果校验失败，会报错。
    validate(schema,options,{
        name:'loader3'
    });
    
    return content;
}

// pitch方法是按照webpack.config.js中的use顺序从上往下执行的，所以最后打印pitch 333
module.exports.pitch = function(){
    console.log('pitch 333');
}