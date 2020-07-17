
// 构建动态链接库


// Dll动态链接库 其实就是做缓存,只会提升打包速度，并不会减少最后产生的代码体积
// 项⽬中引⼊了很多第三⽅库，这些库在很⻓的⼀段时间内，基本不会更新，打包的时候分开打包来提升打包速度，⽽DllPlugin动态链接库插件，
// 其原理就是把⽹⻚依赖的基础模块抽离出来打包到dll⽂件中，当需要导⼊的模块存在于某个dll中时，这个模块不再被打包，⽽是去dll中获取。


// DllPlugin:⽤于打包出⼀个个单独的动态链接库⽂件
// DllReferencePlugin：⽤于在主要的配置⽂件中引⼊DllPlugin插件打包好的动态链接库⽂件


const path = require("path");
const { DllPlugin } = require("webpack");


module.exports = {
    mode:'development',
    entry:{
        react: ["react", "react-dom"] //输出层一个bundle
    },
    output: {
        // path: path.resolve(__dirname, "./dll"),
        path: path.resolve(__dirname, "./dist/dll"), //试验一下clear插件的配置 
        filename: "[name].dll.js",
        // 可以理解成 库 的名称 (也就是对外暴露的变量名)
        library: "reactIkki" , 
        // libraryTarget:'var',
    },
    plugins: [
        new DllPlugin({
            // manifest.json⽂件的输出位置
            // path: path.join(__dirname, "./dll", "[name]-manifest.json"),  //标注了dll文件是webpack的映射
            path: path.join(__dirname, "./dist/dll", "[name]-manifest.json"),  //标注了dll文件是webpack的映射
            // 定义打包的公共vendor⽂件对外暴露的函数名
            name: "reactIkki" //必须和output library一直
        })
    ]
}