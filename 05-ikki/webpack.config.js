const path = require("path");


// 引入插件
const htmlWebpackPlugin = require("html-webpack-plugin"); //
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //dist目录每次打包都更新
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const webpack = require('webpack') //开启HMR.

// tree Shaking
// webpack2.x开始⽀持 tree shaking概念，顾名思义，"摇树"，清除⽆⽤ css,js(Dead Code)
// Dead Code ⼀般具有以下⼏个特征
// 1.代码不会被执⾏，不可到达
// 2.代码执⾏的结果不会被⽤到
// 3.代码只会影响死变量（只写不读）
// 4.Js tree shaking只⽀持ES module的引⼊⽅式！！！！
const PurifyCSS = require('purifycss-webpack') // css摇树   清除⽆⽤ css
const glob = require('glob-all') //可以使用（ './src/*.html'）来匹配文件

//测量各个插件和 loader 所花费的时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// 分析webpack打包后的模块依赖关系
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 作用类似dll的缓存，不过走的是硬件缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// 运⾏在 Node.之上的Webpack是单线程模型的，也就是说Webpack需要⼀个⼀个地处理任务，不能同
// 时处理多个任务。 Happy Pack 就能让Webpack做到这⼀点，它将任务分解给多个⼦进程去并发执
// ⾏，⼦进程处理完后再将结果发送给主进程。从⽽发挥多核 CPU 电脑的威⼒。

// happypack其实来解决loader的消耗
// happypack和MiniCssExtractPlugin配合不好，如果开启MiniCssExtractPlugin那么happypack会报错
// const Happypack = require('happypack')
// var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
// 或者
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })



const  config = {
  entry: "./src/index.js",
  mode: "development",
  // mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include:path.resolve(__dirname,'./src'),
        use: ["style-loader", "css-loader"],
        // use: ["happypack/loader?id=css"]
      },
      {
        test: /\.less$/,
        include:path.resolve(__dirname,'./src'),
        // use:["happypack/loader?id=less"]
        use: [
          // "style-loader",
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
        test: /\.js$/,
        include:path.resolve(__dirname,'./src'),
        use:{
          loader:'babel-loader',
        }
        // use:{
        //   loader:'happypack/loader?id=js'
        // }
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       // ⼀个loader对应⼀个id
      //       loader: "happypack/loader?id=babel"
      //     }
      //   ]
      // },
    ],
  },

  optimization: {
    // js的摇树 
    // 只要mode是production就会⽣效，develpoment的tree shaking是不⽣效的，因为webpack为了⽅便你的调试（⽣产模式不需要配置，默认开启）
    // package.json可以配置"sideEffects":false  
    usedExports: true, //将使用过得模块打包

    // 代码分割 
    // splitChunks: {
      // chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀个单独的⽂件
      // chunks: 'all',//对同步 initial，异步 async，所有的模块有效 all
      // minSize: 30000,//最⼩尺⼨，当模块⼤于30kb就把模块分割出去
      // maxSize: 0,//对模块进⾏⼆次分割时使⽤，不推荐使⽤
      // minChunks: 1,//打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块（就是最少被引用的次数，如果不被低于这个次数，就不分割）
      // maxAsyncRequests: 5,//最⼤异步请求数，默认5
      // maxInitialRequests: 3,//最⼤初始化请求书，⼊⼝⽂件同步请求，默认3
      // automaticNameDelimiter: '-',//打包分割符号
      // name: true,//打包后的名称，除了布尔值，还可以接收⼀个函数function
      // cacheGroups: {//缓存组,可以分割成多个文件
      //   loadsh:{
      //     test:/lodash/,
      //     name:'lodash'
      //   },
      //   react:{
      //     test:/react|react-dom/,
      //     name:'react'
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name:"vendor", // 要缓存的 分隔出来的 bundel 名称
      //     priority: -10//缓存组优先级 数字越⼤，优先级越⾼(优先处理,如果发生冲突，优先高的覆盖优先低的)
      //   },
      //   other:{
      //     chunks: "initial", // 必须三选⼀： "initial" | "all" | "async"(默认就是async)
      //     test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk,
      //     name:"other",
      //     minSize: 30000,
      //     minChunks: 1,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true//可设置是否重⽤该chunk
      //   }
      // }
    // },
    // 作⽤域提升（Scope Hoisting）是指 webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关系，尽可能地把模块放到同⼀个函数中。(bundle中尽量把模块翻入一个eval函数中)
    concatenateModules:true //开启 Scope Hoisting
  },
  plugins:[
    new CleanWebpackPlugin(
      {
        cleanOnceBeforeBuildPatterns: ["!./dist/dll/*"] //排除特指的文件被清除
      }
    ),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css" 
    }),
    // 清除⽆⽤ css （摇树）
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
        path.resolve(__dirname, './src/*.js'), //对js文件中加载的css进行摇树
      ])
    }),
    // new OptimizeCSSAssetsPlugin({
    //   cssProcessor:require('cssnano'),//引⼊cssnano配置压缩选项（cssnano其实是postcss的依赖）
    //   cssProcessorOptions:{
    //     discardComments: { removeAll: true }
    //   }
    // }),
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      title:'my app',
      // minify: {
      //   // 压缩HTML⽂件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空⽩符与换⾏符
      //   minifyCSS: true // 压缩内联css
      // }
    }),
    new webpack.HotModuleReplacementPlugin(),
  
    // new BundleAnalyzerPlugin(),  // 分析webpack打包后的模块依赖关系
    // 分析dll中都包含的库，（先分析入口文件中的依赖，然后去的dll下的manifest文件找是否有对于的模块，有点话走缓存的文件（库的代码在react.dll.js里面））
    // react.dll.js用于html模板里面(可以理解为里面存取了相对应的模块内容)
    // manifest文件本质上是一个第三方库的映射（库的名称，模块名称，模块id，模块保存位置）
    // 这是开发优化
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname,"./dll/react-manifest.json")
    }),

    // HardSourceWebpackPlugin作用类似dll的缓存，不过走的是硬件缓存
    // 提供中间缓存的作⽤
    // ⾸次构建没有太⼤的变化
    // 第⼆次构建时间就会有较⼤的节省
    // new HardSourceWebpackPlugin(),

    // new HappyPack({
    //   // ⽤唯⼀的标识符id，来代表当前的HappyPack是⽤来处理⼀类特定的⽂件
    //   id:'babel',
    //   loaders:['babel-loader?cacheDirectory'],
    //   // threadPool: happyThreadPool, //共享进程（慎用：因为项目小的时候，开启happypack和多线程都需要时间，有时候发现构建时间反而增加）
    // }),
    // new HappyPack({
    //   id:'css',
    //   loader:['style-loader','css-loader']
    // }),
    // new HappyPack({
    //   id:'js',
    //   loader:['babel-loader']
    // }),
  ],
  devtool:"cheap-module-eval-source-map",

  resolve:{
    modules:[path.resolve(__dirname,'./node_modules')],
  },
};



module.exports = smp.wrap(config);
