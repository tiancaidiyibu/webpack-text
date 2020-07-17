module.exports = function (source,sourceMap,ast) {
    // loader是处理模块的
    // 多个loader有处理顺序
    // console.log(source)  //console.log("hello,webpack-loader!");
    
    // 通过this可以拿到webpack.config.js传进来的参数
    // console.log(this.query) //{ name: 'Ikki' }
    // const result = source.replace('hello',this.query.name)
    // console.log(result) //console.log("Ikki,webpack-loader!");

    // 如果loader中存在异步，那么可以使用this.async()
    // callback等于this.callback()
    const callback = this.async()
    setTimeout(()=>{
        const result = source.replace('hello',this.query.name)
        // return result
        callback(null,result)
    },3000)

    // 因此必须要有返回值
    // return result
    // 官方推荐返回值使用this.callback(err,content,sourceMap,meta)
    // this.callback(null,result)
}
