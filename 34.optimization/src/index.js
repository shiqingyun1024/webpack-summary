// import count from './count'
// import './css/index.css'
import '$css/index'  // 指定了别名路径，可以这样写。webpack.config.js中配置了extensions，所以可以不写文件后缀名
function add(x,y){
   return x+y;
}
import('./count').then(({default:count})=>{
   console.log(count(5,3))
})
console.log(add(2,3))
