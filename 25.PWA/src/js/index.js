import 'core-js/modules/es.array.reduce.js';

import { mul } from './test';
import '../index.less';

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));

function sum() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4));
console.log(mul(2, 8));
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
    "env":{
      "browser":true // 支持浏览器端全局变量,如果是node端，就写"node":true
    }

  2. serviceworker代码必须运行在服务器上
  ---> nodejs
  --->
     npm i serve -g
     serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceworker
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('servicework注册成功了~');
    }).catch(() => {
      console.log('servicework注册失败了~');
    });
  });
}
