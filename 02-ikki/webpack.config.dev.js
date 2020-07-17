const path = require("path");
const baseConfig = require('./webpack.config.base') //引入基础配置
const {merge} = require("webpack-merge") //合并配置



const htmlWebpackPlugin = require("html-webpack-plugin"); //将html文件放入到打包目录中
const webpack = require('webpack') //开启HMR


const devConfig = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
          {
            test: /\.less$/,
            include:path.resolve(__dirname,'./src'),
            use: [
              'style-loader',
              {
                loader:"css-loader",
                options:{
                  modules:true, 
                }
              },
              {
                loader:'postcss-loader'  //样式⾃动添加前缀，例如ie，谷歌等等 display: -webkit-box; display: -ms-flexbox;
              },
              'less-loader' //将less后缀名的文件转化成css格式
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            include:path.resolve(__dirname,'./src'),
            use:{
              // url-loader是ile-loader加强版本
              // 推荐使用url-loader，因为支持limit
              loader:'url-loader', 
              // options额外的配置，⽐如资源名称
              options:{
                name:'[name]_[hash:6].[ext]', //[ext]⽼资源模块的后缀,就是原来的后缀
                //打包后的存放位置
                outputPath:'images/',
                // ⼩于1024*12，才转换成base64，放到bundle中了，不会放到images文件夹中
                // 推荐小体积的图片资源转出base64
                limit:1024*12 //单位是字节 1024=1kb
              }
            }
          },
          // Babel在执⾏编译的过程中，会从项⽬根⽬录下的 .babelrc JSON⽂件中读取配置。没有该⽂件会从loader的options地⽅读取配置。
          {
            test: /\.js$/,
            include:path.resolve(__dirname,'./src'),
            // exclude:/node_modules/, //排除node_modules目录
            use:{
              loader:'babel-loader',  //babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的⼯作，这部分⼯作需要⽤到@babel/preset-env来做
            }
          }
        ],
      },
    devtool:"cheap-module-eval-source-map",// 开发环境配置（推荐配置）
    plugins:[
        new htmlWebpackPlugin({
            // 选择输入模板
            template:'./src/index.html',
            // 输出的 HTML ⽂件名，⽀持加载器
            filename:'index.html',
            // ⽤来⽣成⻚⾯的 title 元素,不过需要在html中修改title标签 <title><%= htmlWebpackPlugin.options.title%></title>
            title:'my app',
        }),
        //热模块替换  
        new webpack.HotModuleReplacementPlugin() 
    ],
    // WebpackDevServer是一个基于express的小型服务，提升开发效率的利器
    // 启动服务后，会发现dist⽬录没有了，这是因为devServer把打包后的模块不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度
    devServer: {
        contentBase: "./dist", //设置路径(也支持绝对路径)，默认打开dist下面的index.html文件
        open: true,  //自动打开默认浏览器窗口
        port: 8081, //设置端口
        proxy:{  //解决dev环境开发mock数据跨域问题
        '/api':{
            target:'http://localhost:3001'
        }
        },
        // mock-server:加载WebpackDevServer中间件之前的钩子（hooks） 钩入了express服务
        before(app,server){
        app.get('/api/mock.json',(req,res)=>{
            res.json({
                name:'Ikki',
                age:18,
                msg:'Ikki happy'
            })
        })
        },
        // 加载WebpackDevServer中间件之后的钩子（hooks）
        // after(){
        // },

        // 启动HMR后，css抽离会不⽣效，还有不⽀持contenthash，chunkhash 
        // css热模块只更新css样式，不更新已经出发的动作和交互
        hot:true, //css模块开启热模块替换  在plugins中对应插件webpack.HotModuleReplacementPlugin() 
        hotOnly:true, //css模块 即便HMR没有生效，浏览器也不要自动刷新

    },
}


module.exports = merge(baseConfig,devConfig)