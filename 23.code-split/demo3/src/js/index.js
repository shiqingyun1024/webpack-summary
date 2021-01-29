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
*/ 
import('./test')
   .then((result)=>{
      //  文件加载成功  
       console.log('1234')
       console.log(result)
   })
   .catch(()=>{
       console.log('文件加载失败~');
   })