import "../index.less"
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));

function sum(...args){
    return args.reduce((p,c)=>p+c,0)
}

console.log(sum(1,2,3))