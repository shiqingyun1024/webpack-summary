const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');
class Lesson{
    constructor(){
        // 初始化hooks容器
        this.hooks = {
            // SyncHook, SyncBailHook 都是同步的钩子
            // go:new SyncHook(['address'])  数组中可以传n个参数
            go:new SyncBailHook(['address']), // 一旦遇到return就不往下执行了

            // AsyncParallelHook 是异步的钩子,  异步并行执行
            // leave:new AsyncParallelHook(['name','age']),
            // AsyncSeriesHook ：异步串行（按顺序执行）
            leave:new AsyncSeriesHook(['name','age'])
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
        // cb就是callback
        this.hooks.leave.tapAsync('class0510',(name,age,cb)=>{
            setTimeout(()=>{
                console.log('class0510',name,age);
                // 一定要调用cb()
                cb();
            },2000)
        })
        // 第二种异步的写法
        this.hooks.leave.tapPromise('class0630',(name,age)=>{
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    console.log('class0630',name,age);
                    resolve();
                },1000)
            })
        })
    }

    start(){
        // 触发hooks
        this.hooks.go.call('c318');
        this.hooks.leave.callAsync('jack',18,function(){
            // 代表所有leave容器中的函数触发完了，才触发
            console.log('end~~~');
        });
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

// AsyncParallelHook打印结果如下（并行执行，先输出class0630再输出class0510）：
// class0318 c318
// class0630 jack 18
// class0510 jack 18

// AsyncSeriesHook打印结果如下（顺序执行）：
// class0318 c318
// class0510 jack 18
// class0630 jack 18







