import {mul} from './test'
console.log("index.js文件进行加载")
document.getElementById('btn').onclick = function(){
    console.log(mul(4.5))
}