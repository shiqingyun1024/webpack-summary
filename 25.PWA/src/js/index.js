import {mul} from './test';
import "../index.less"
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));

function sum(...args){
    return args.reduce((p,c)=>p+c,0)
}

console.log(sum(1,2,3,4))

console.log(mul(2,8));

// 注册serviceworker
// 处理兼容性问题
if('serviceworker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js')
        .then(()=>{
            console.log('servicework注册成功了~')
        })
        .catch(()=>{
            console.log('servicework注册失败了~')
        })
    })
}