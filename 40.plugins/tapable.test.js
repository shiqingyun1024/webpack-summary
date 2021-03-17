const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');
class Lesson{
    constructor(){
        // 初始化hooks容器
        this.hooks = {
            go:new SyncHook(['address'])
        }
    }
}




