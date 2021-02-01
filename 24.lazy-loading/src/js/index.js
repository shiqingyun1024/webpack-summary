// import {mul} from './test'
console.log("index.js文件进行加载")
document.getElementById('btn').onclick = function(){
    // 懒加载~  懒加载的前提是先进行代码分割。当文件需要使用时才加载~
    // 预加载 webpackPrefetch:true,会在使用之前，提前加载js文件。
    // 正常加载可以认为是并行加载（同一时间加载多个文件）预加载 Prefetch 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源。这样更加灵活一点。不过兼容性不太好。
    import(/* webpackChunkName:'test', webpackPrefetch:true*/ './test')
    // import(/* webpackChunkName:'test'*/ './test')
    .then(({mul})=>{
       console.log(mul(4,5))
    })
    .catch(error=>{
        console.log(error);
    })
}