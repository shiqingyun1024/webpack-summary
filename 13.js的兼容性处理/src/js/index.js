import '@babel/polyfill'; // 如果用polyfill的话，就直接引入。全部做兼容性处理，代码体积会很大。
const add = (x,y)=>{
    return x+y;
}
console.log(add(1,2))

// promise接受一个函数作为参数，这个函数又接受两个参数，分别是resolve和reject这两个函数
const promise = new Promise((resolve)=>{
   setTimeout(()=>{
       resolve(10)
   },1000)
})
console.log(promise)