// import {mul} from './test'
console.log("index.js文件进行加载")
document.getElementById('btn').onclick = function(){
    // 懒加载~  懒加载的前提是先进行代码分割。
    // 预加载 Prefetch
    // import(/* webpackChunkName:'test', webpackPrefetch:true*/ './test')
    import(/* webpackChunkName:'test'*/ './test')
    .then(({mul})=>{
       console.log(mul(4,5))
    })
    .catch(error=>{
        console.log(error);
    })
}