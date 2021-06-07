const baseConfig = require('./webpack.config.base.js')
const devConfig = require('./webpack.config.dev.js')
const proConfig = require('./webpack.config.pro.js')
const {merge } = require('webpack-merge')


console.log(process.env.NODE_ENV)



module.exports = (env) => {
    console.log('sddddddddddddd')
    // cross-env是抹平win和linux平台路径差异
    // window路径  \\\\
    // linux路径  ///
    if(process.env.NODE_ENV==='test'){
        return  merge(baseConfig,proConfig)
    }else{
        return merge(baseConfig,devConfig)
    }


    // 如果外部传去env.production   是生产
    // 如果外部传去env.XXX   是开发
    // if(env && env.production){
    //     return  merge(baseConfig,proConfig)
    // }else{
    //     return merge(baseConfig,devConfig)
    // }
}