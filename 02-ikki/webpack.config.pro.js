const baseConfig = require('./webpack.config.base') //引入基础配置
const {merge} = require("webpack-merge") //合并配置
const path = require("path");



const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css


const proConfig = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        // CDN通过将资源部署到世界各地，使得⽤户可以就近访问资源，加快访问速度。要接⼊CDN，需要把⽹⻚的静态资源上传到CDN服务上，在访问这些资源时，使⽤CDN服务提供的URL。
        publicPath: '//cdnURL.com', //指定存放JS⽂件的CDN地址
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            include:path.resolve(__dirname,'./src'),
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            include:path.resolve(__dirname,'./src'),
            use: [
              MiniCssExtractPlugin.loader, 
              {
                loader:"css-loader",
                options:{
                  modules:true, 
                }
              },
              {
                loader:'postcss-loader' 
              },
              'less-loader' 
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            include:path.resolve(__dirname,'./src'),
            //use使⽤⼀个loader可以⽤对象，字符串，两个loader需要⽤数组
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
      plugins:[
        new MiniCssExtractPlugin({
          filename: "css/[name]-[contenthash:8].css" 
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor:require('cssnano'),//引⼊cssnano配置压缩选项（cssnano其实是postcss的依赖）
          cssProcessorOptions:{
            discardComments: { removeAll: true }
          }
        }),
        new htmlWebpackPlugin({
          // 选择输入模板
          template:'./src/index.html',
          // 输出的 HTML ⽂件名，⽀持加载器
          filename:'index.html',
          // ⽤来⽣成⻚⾯的 title 元素,不过需要在html中修改title标签 <title><%= htmlWebpackPlugin.options.title%></title>
          title:'my app',
          minify: {
            // 压缩HTML⽂件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空⽩符与换⾏符
            minifyCSS: true // 压缩内联css
          }
        }),
      ],
}

module.exports = merge(baseConfig,proConfig)