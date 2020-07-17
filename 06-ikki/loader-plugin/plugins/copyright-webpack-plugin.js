class CopyrightWebpackPlugin {
    // 接受参数
    constructor(options) {
        // console.log(options)
    }
    //compiler：webpack实例
    apply(compiler) {
        // console.log(compiler)
        // emit生成资源文件输出到目录之前  异步钩子
        // compiler.hooks.emit.tapAsync(
        //     "CopyrightWebpackPlugin",//插件名称
        //     (compilation, cb) => {
        //         console.log(compilation.assets) //资源列表
                // compilation.assets["copyright.txt"] = {
                //     // 文件内容
                //     source: function() {
                //         return "hello copy";
                //     },
                //     // 定义文件大小
                //     size: function() {
                //         return 20;
                //     }
                // };
        //         // 完成之后走回调，告诉compilation事情结束
        //         cb();
        //     }   
        // )
        //同步的写法
        compiler.hooks.compile.tap(
            "CopyrightWebpackPlugin",
            compilation => {
                console.log('开始了')
            });
        }
}
module.exports = CopyrightWebpackPlugin;