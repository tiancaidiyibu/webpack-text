const path = require("path");


// 引入插件
const htmlWebpackPlugin = require("html-webpack-plugin"); //打包html到bundle资源中
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //出口目录每次打包都更新
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css


const webpack = require('webpack') //开启HMR.


module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    // CDN通过将资源部署到世界各地，使得⽤户可以就近访问资源，加快访问速度。要接⼊CDN，需要把⽹⻚的静态资源上传到CDN服务上，在访问这些资源时，使⽤CDN服务提供的URL。
    // publicPath: '//cdnURL.com', //指定存放JS⽂件的CDN地址,
  },
  module: {
    // loader是一个消耗性能的大户，缩⼩⽂件范围 Loader
    // test include（命中） exclude（排除）三个配置项来缩⼩loader的处理范围（推荐include）
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
          // 'style-loader',  //如果使用MiniCssExtractPlugin就不需要style-loader,因为style-loader会把bundle中的css提取到html中
          MiniCssExtractPlugin.loader, //将bundle中的css提取到独立的文件，名字是按照plugins中配置的filename(对HMR热更新很不友好)
          {
            loader:"css-loader",
            options:{
              // 开启css模块化：帮助js可以直接使用css类名
              modules:true, 
            }
          },
          // 在css-loader前面执行
          // 需要插件机制
          {
            loader:'postcss-loader'  //为了浏览器支持css3，必须给样式⾃动添加前缀，例如ie，谷歌等等 display: -webkit-box; display: -ms-flexbox;
          },
          'less-loader' //将less后缀名的文件转化成css格式
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   include:path.resolve(__dirname,'./src'),
      //   //use使⽤⼀个loader可以⽤对象，字符串，两个loader需要⽤数组
      //   use:{
      //     // file-loader处理静态资源模块
      //     loader:'file-loader', 
      //     // options额外的配置，⽐如资源名称
      //     options:{
      //       name:'[name]_[hash:6].[ext]', //[ext]⽼资源模块的后缀,就是原来的后缀
      //       //打包后的存放位置
      //       outputPath:'images/'
      //     }
      //   }
      // },
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
            limit:1024*12
              //单位是字节 1024=1kb
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
          // @babel/core是包含了babel的核心api，也就是babel的基础库(babel依赖他进行ast的转换)
          // babel插件分两种：1.语法转换，2.语法分析
          // options:可以挪到单独的babelrc配置文件
          // options:{
          //   presets: [
          //     // 语法转换插件  preset-env
          //     [
          //       "@babel/preset-env",
          //       {
          //         // entry: 需要在 webpack 的⼊⼝⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根据你的使⽤情况导⼊语法垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。
          //         // usage: 不需要import ，全⾃动检测，但是要安装 @babel/polyfill 。（试验阶段,推荐使用）
          //         // false: 如果你 import"@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)
          //         // 缺点：polyfill垫片会污染全局对象，因为垫片是将规范（例如promise）放到全局对象而已（对于做开源UI库，组价库，工具库）
          //         useBuiltIns: "usage",//按需加载字段，对应入口文件的@babel/polyfill
          //         corejs: 2,//新版本需要指定核⼼库版本
          //         targets: { //目标浏览器
          //           edge: "17",
          //           firefox: "60",
          //           chrome: "67",
          //           safari: "11.1"
          //         },
          //       }
          //     ],
          //     // react语法解析插件
          //     "@babel/preset-react"
          //   ]
          // }
        }
      }
    ],
  },  
  plugins:[
    new CleanWebpackPlugin(),
    //将bundle中的css提取到独立的文件，名字是按照plugins中配置的filename(对HMR热更新很不友好)，在开发模式下建议不开启
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
    //热模块替换  
    new webpack.HotModuleReplacementPlugin() 
  ],
  // devtool：源代码与打包后的代码的映射关系，通过sourceMap定位到源代码。
  // 在dev模式中，默认开启，关闭的话 可以在配置⽂件⾥
  // devtool:'none'
  // devtool:'source-map', //dist产⽣.map⽂件,代表bundle和源代码的关系映射，生产环境不建议开启，开发环境开启（开发环境默认是开启的）
  // devtool:'inline-source-map' //把映射关系以base64格式放入bundle文件中去
  // devtool:'cheap-inline-source-map' //把映射关系以base64格式放入bundle文件中去,还能定位出列信息
  devtool:"cheap-module-eval-source-map",// 开发环境配置（推荐配置）


  // WebpackDevServer是一个基于express的小型服务，提升开发效率的利器
  // 启动服务后，会发现dist⽬录没有了，这是因为devServer把打包后的模块不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度
  devServer: {
    contentBase: "./dist", //设置路径(也支持绝对路径)，默认打开dist下面的index.html文件
    open: true,  //自动打开默认浏览器窗口
    port: 8081, //设置端口
    proxy:{  //代理：解决dev环境开发数据跨域问题
      '/api':{
        target:'http://localhost:3001'
      }
    },
    // mock-server:解决本地开发mock问题 加载WebpackDevServer中间件之前的钩子（hooks） 钩入了express服务
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

  resolve:{
    // 寻找第三⽅模块，默认是在当前项⽬⽬录下的node_modules⾥⾯去找，如果没有找到，就会去上⼀级⽬录../node_modules找，再没有会去../../node_modules中找，以此类推，和Node.js的模块寻找机制很类似。
    // resolve.modules⽤于配置webpack去哪些⽬录下寻找第三⽅模块，默认是['node_modules']
    // 如果我们的第三⽅模块都安装在了项⽬根⽬录下，就可以直接指明这个路径(node_modules)。
    modules:[path.resolve(__dirname,'./node_modules')],
    // resolve.alias配置通过别名来将原导⼊路径映射成⼀个新的导⼊路径 
    alias:{
      // 减少查找过程
      // 起别名
      '@':path.join(__dirname,'./src/css'),
      // 默认情况下，webpack会从⼊⼝⽂件./node_modules/bin/react/index开始递归解析和处理依赖的⽂件。我们可以直接指定⽂件，避免这处的耗时。
      react:path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
      'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js')
    },
    // 在导⼊语句没带⽂件后缀时，webpack会⾃动带上后缀后，去尝试查找⽂件是否存在。(不要滥用extensions)
    // 后缀尝试列表尽量的⼩
    // 导⼊语句尽量的带上后缀。
    extensions:['.js','.json','.jsx','.ts'],
  },
  // 如果html上引入库的cdn，而js文件中也使用了这个库，那么打包的时候可以使用externals不讲js中库打包，而是直接调用cdn
  externals:{
    //jquery通过script引⼊之后，全局中即有了 jQuery 变量
    'jquery': 'jQuery',
    'lodash': '_'
  }
};
