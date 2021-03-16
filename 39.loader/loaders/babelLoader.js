// 自己写一个babel-loader
// loader 本质上是一个函数
// content是文件的内容，map是文件的映射信息，meta是文件的元信息
// module.exports是commonjs规范
const { getOptions } = require('loader-utils')
// 校验options是否满足校验规则
const { validate } = require('schema-utils')
// babel编译的核心库
const babel = require('@babel/core')

const babelSchema = require('./babelSchema.json');


module.exports = function (content, map, meta) {
    //  获取loader的options配置
    const options = getOptions(this);
    // 校验babel的options的配置
    validate(babelSchema, options, {
        name: 'Babel Loader'
    })

    // 创建异步
    const callback = this.async();

    // 使用babel


}