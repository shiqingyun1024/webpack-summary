// 自己写一个babel-loader
// loader 本质上是一个函数
// content是文件的内容，map是文件的映射信息，meta是文件的元信息
// module.exports是commonjs规范
const { getOptions } = require('loader-utils')
// 校验options是否满足校验规则
const { validate } = require('schema-utils')
// babel编译的核心库
const babel = require('@babel/core');
// util是node中的一个方法库
const util = require('util');

const babelSchema = require('./babelSchema.json');

// babel.transform用来编译代码的方法
// 是一个普通的异步方法
// util.promisify将普通异步方法转化成基于promise的异步方法
const transform = util.promisify(babel.transform);


module.exports = function (content, map, meta) {
    //  获取loader的options配置
    const options = getOptions(this) || {};
    // 校验babel的options的配置
    validate(babelSchema, options, {
        name: 'Babel Loader'
    })

    // 创建异步
    const callback = this.async();

    // 使用babel编译代码
    transform(content,options)
    // 这一步先记住这样写  
       .then(({code,map})=>callback(null,code,map,meta))
       .catch((e) => callback(e))
}