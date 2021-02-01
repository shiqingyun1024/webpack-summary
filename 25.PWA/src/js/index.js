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

console.log(mul(2,8))