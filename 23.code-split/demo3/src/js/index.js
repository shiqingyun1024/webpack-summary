import $ from 'jquery'
// import mul from './test'
function add(x,y){
    return x+y;
}
console.log(add(1,8))
// console.log(mul(1,8))
console.log($)
/*
  通过js代码，让某个文件单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/ 
import('./test')
   .then(({mul})=>{
      //  文件加载成功  
       console.log('1234')
       console.log(mul)
       console.log(mul(2,5))
   })
   .catch(()=>{
       console.log('文件加载失败~');
   })