const path = require("path");

const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  // 处理loader的路径问题
  // resolveLoader: {
  //   modules: ["node_modules", "./myLoaders"],
  // },
  plugins: [new CopyrightWebpackPlugin({
    name:'kkb'
  })],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use:path.resolve(__dirname,'./myLoader/index.js')
      // }
      // {
      //   test: /\.js$/,
      //   use:[
      //     // path.resolve(__dirname,'./myLoader2/index.js'),
      //     'kkbloader',
      //     {
      //       loader:'kkbloaderAsync',
      //       // loader:path.resolve(__dirname,'./myLoader/index.js'),
      //       options:{
      //         name:'Ikki'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     "kkbloader",
      //     {
      //       loader: "kkbloaderAsync",
      //       options: {
      //         name: "开课吧",
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.less$/,
      //   use: ["style-loader","less-loader"],
      // },
    ],
  },
};
