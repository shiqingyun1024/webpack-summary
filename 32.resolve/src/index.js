// import count from './count'
function add(x,y){
   return x+y;
}
import('./count').then(({default:count})=>{
   console.log(count(5,3))
})
console.log(add(2,3))
