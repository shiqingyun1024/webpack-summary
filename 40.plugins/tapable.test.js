const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');
class Lesson{
    constructor(){
        // 初始化hooks容器
        this.hooks = {
            go:new SyncHook(['address'])
        }
    }
    tap(){
        // 往hooks容器中注册事件/添加回调函数，可以添加多个，而且执行的时候按顺序执行
        this.hooks.go.tap('class0318',(address)=>{
            console.log('class0318',address);
            return 111;
        })
        this.hooks.go.tap('class0318',(address)=>{
            console.log('class0318',address);
        })
    }

    start(){
        // 触发hooks
        this.hooks.go.call('c318');
    }
}

const l = new Lesson();
l.tap();
l.start();
// 打印结果如下：
// class0318 c318
// class0318 c318




