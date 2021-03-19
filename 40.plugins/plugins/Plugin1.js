// 每一个plugins都是一个类或者构造函数，都是new出来的

class Plugin1{
    constructor(){
        
    }
    // 每个plugin都有一个apply方法，new的时候调用
    apply(complier){
        // 使用complier上的一些钩子去做一些操作,可以绑定多个
        complier.hooks.emit.tap('Plugin1',(compilation)=>{
           console.log('emit.tap');
        })
        complier.hooks.emit.tapAsync('Plugin1',(compilation,cb)=>{
            setTimeout(()=>{
                console.log('emit.tapAsync 111');
                cd();
            },1000)
         })
         complier.hooks.emit.tapPromise('Plugin1',(compilation)=>{
             return new Promise(()=>{
                setTimeout(()=>{
                    console.log('emit.tapPromise 111');
                    resolve();
                },1000)
             })
         })
        complier.hooks.afterEmit.tap('Plugin1',(compilation)=>{
            console.log('afterEmit.tap');
         })
         complier.hooks.done.tap('Plugin1',(compilation)=>{
            console.log('doneEmit.tap');
         })
    }

}
module.export = Plugin1;
// export default Plugin1;







