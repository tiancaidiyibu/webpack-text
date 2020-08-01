const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const {SkeletonPlugin} = require('./skeletonk')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module:{
        rules:[
            // {
            //     test: /\.js$/,
            //     // exclude:/node_modules/, //排除node_modules目录
        
            //     use:{
            //       loader:'babel-loader',  //babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的⼯作，这部分⼯作需要⽤到@babel/preset-env来做
            //       // babel插件分两种：1.语法转换，2.语法分析
            //       // options:可以挪到单独的babelrc配置文件
            //       options:{
            //         presets: [
            //           // 语法转换插件  preset-env
            //           [
            //             "@babel/preset-env",
            //           ],
            //           // react语法解析插件
            //           "@babel/preset-react"
            //         ]
            //       }
            //     }
            //   }
            // ],
            {
                test: /\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env','@babel/preset-react']
                        }
                    }
                ],
                // excludes:/node_modules/
            },
        ]
        
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist')
    },
    plugins:[
       new HtmlWebpackPlugin({
           template:'./src/index.html'
       }),
       new SkeletonPlugin({
           //我们要启动一个静态文件服务器，去显示dist目录里的页面。
           staticDir:path.resolve(__dirname,'dist'),
           port:8000,
           origin:'http://localhost:8000',
           device:'iPhone 6',
           defer:5000,
           button:{
               color:"#111"
           },
           image:{
               color:'#111'
           }
       })
    ]
}