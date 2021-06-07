// 执行webpack的时候会先从文件中找webpack.config.js这个文件的配置，如果没有就走webpack的默认配置

// webpack是基于nodejs
// webpack配置就是一个对象
const path = require('path')

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 上下文 项目打包的相对路径  必须是绝对路径 默认值是 process.cwd()
    context:process.cwd(),
    // 打包入口，构建项目的入口  支持字符串，数组，对象三种类型
    entry:'./src/index.js',
    // entry:['./src/index.js','./src/other.js'], //不是多入口， webpack会⾃动⽣成另外⼀个⼊⼝模块，并将数组中的每个指定的模块加载进来，并将最后⼀个模块的module.exports作为⼊⼝模块的module.exports导出。
    // entry:{
    //     main:'./src/index.js', //默认值 等价于entry:'./src/index.js',
    // },
    // entry:{  //多入口必须对应多出口  1个chunk（代码块，一个chunk可以由多个module组成）对应一个bundle(打包构建生产的资源文件)
    //     index:'./src/index.js', 
    //     other:'./src/other.js', 
    // },
    
    // 打包出口，
    output:{
        // 构建的资源放哪里,必须是绝对路径  默认是dist
        path:path.resolve(__dirname,'./build'),
        // 构建的文件叫什么  默认是main.js
        // filename:'index.js'
        // 多出口用占位符解决，无论多出口还是单出口都推荐使用占位符
        // filename:'[name]-[chunkhash:6].js'，
        filename:'[name]-[hash:6].js'
        // 占位符
        // 1.hash //整个项目得hash值，每构建一次就会有一个hash值  可以指定长度，默认是20位
        // 2.chunkhash  //根据不同入口entry进行依赖解析，构建对应的chunk，生成相应的hash，
                        //只要组成 entry的模块没有内容改动，则对应的hash不变
        // 3.name  //默认值是main
        // 4.id
    },

    // 模式 指定当前的构建环境 none production development
    // 默认是：production(线上，生产)
    mode:'development',


    // 插件 ： 在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情
    // webpack的打包过程是有（⽣命周期概念）钩⼦
    // plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念
    plugins:[
        new CleanWebpackPlugin(),
        // new htmlWebpackPlugin({
        //     title: "My App",
        //     filename: "app.html",
        //     template: "./src/index.html"
        // })
    ],


    // Webpack 默认只⽀持.json 和 .js模块 不⽀持 不认识其他格式的模块
    // loader：模块解析，模块转换器，⽤于把模块原内容按照需求转换成新内容。
    // 处理不认识的模块 当webpack处理到不认识的模块时，需要在webpack中的module处进⾏配置，当检测到是什么格式的模块，使⽤什么loader来处理。
    module : {
        rules:[
            {
                test:/\.css$/,  //指定匹配规则
                // loader 模块转换
                // css-loader 是把css模块内容加入到js模块中  （css in js方式）
                // style-loader 从js中提取css的loader  在html中创建style标签，把css的内容放到标签中
                use:['style-loader','css-loader'] //指定使⽤的loader,转换顺序是从后往前  
            }
        ]
    }

    // loader和plugin区别是  loader只是个函数，plugin是个类
    // Hash chunkhash contenthash 的区别
    // 1.hash：整个项目得hash值，每构建一次就会有一个hash值  可以指定长度，默认是20位
    // 2.chunkhash：根据不同入口entry进行依赖解析，构建对应的chunk，生成相应的hash，只要组成entry的模块没有内容改动，则对应的hash不变
    // 3.contenthash：在MiniCssExtractPlugin中提取css文件，如果只是index.js改变js代码，没有改变import中css文件的代码，那么css文件名就不应该改变
}