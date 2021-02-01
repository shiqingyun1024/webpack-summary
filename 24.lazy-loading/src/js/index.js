// import {mul} from './test'
console.log("index.js文件进行加载")
document.getElementById('btn').onclick = function(){
    // 懒加载~
    import(/* webpackChunkName:'test'*/ './test')
    .then(({mul})=>{
       console.log(mul(4,5))
    })
    .catch(error=>{
        console.log(error);
    })
}