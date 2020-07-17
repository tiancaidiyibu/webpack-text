const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //dist目录每次打包都更新


module.exports = {
  entry: "./src/index.js",

  
  plugins:[
    new CleanWebpackPlugin(),
  ],
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
};
