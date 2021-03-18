const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');
class Lesson{
    constructor(){
        // 初始化hooks容器
        this.hooks = {
            // SyncHook, SyncBailHook 都是同步的钩子
            // go:new SyncHook(['address'])  数组中可以传n个参数
            go:new SyncBailHook(['address']), // 一旦遇到return就不往下执行了

            // AsyncParallelHook, AsyncSeriesHook 都是异步的钩子
            leave:new AsyncParallelHook(['name','age'])
        }
    }
    tap(){
        // 往hooks容器中注册事件/添加回调函数，可以添加多个，而且执行的时候按顺序执行
        this.hooks.go.tap('class0318',(address)=>{
            console.log('class0318',address);
            return 111;
        })
        this.hooks.go.tap('class0340',(address)=>{
            console.log('class0340',address);
        })
        this.hooks.leave.tap('class0510',(address)=>{
            console.log('class0510',address);
        })
    }

    start(){
        // 触发hooks
        this.hooks.go.call('c318');
        this.hooks.leave.call('jack',18);
    }
}

const l = new Lesson();
l.tap();
l.start();
// SyncHook打印结果如下：
// class0318 c318
// class0340 c318

// SyncBailHook打印结果如下：
// class0318 c318




