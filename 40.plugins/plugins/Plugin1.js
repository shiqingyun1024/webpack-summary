// 每一个plugins都是一个类或者构造函数，都是new出来的

class Plugin1{
    // 每个plugin都有一个apply方法，new的时候调用
    apply(complier){
        // 使用complier上的一些钩子去做一些操作,可以绑定多个
        complier.hooks.emit.tap('Plugin1',(compilation)=>{
           console.log('emit.tap');
        })
        complier.hooks.afterEmit.tap('Plugin1',(compilation)=>{
            console.log('afterEmit.tap');
         })
    }

}
module.export = Plugin1;







