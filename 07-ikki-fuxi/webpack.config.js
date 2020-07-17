

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css



const webpack = require('webpack') //开启HMR.

module.exports = {
    mode:'development',
    devtool:"cheap-module-eval-source-map",// 开发环境配置（推荐配置）
    context:process.cwd(), 
    
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "My App",
            filename:'index.html',
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:8].css" 
        }),
        //热模块替换  
        new webpack.HotModuleReplacementPlugin() 
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                include:path.resolve(__dirname,'./src'),
                use:['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                include:path.resolve(__dirname,'./src'),
                use:[
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                    },
                    'less-loader'

                ]
            },
            {
                test: /\.js$/,
                include:path.resolve(__dirname,'./src'),
                use:{
                    loader:'babel-loader'
                }
            }
            
        ]
    },
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8009,
        proxy:{
            '/api':{
                target:'http://localhost:3001'
            }
        },
        before(app,server){
            app.get('/api/mock.json',(req,res)=>{
              res.json({
                  name:'Ikki',
                  age:18,
                  msg:'Ikki happy'
              })
            })
        },
        hot:true,
        hotOnly:true
    }
}