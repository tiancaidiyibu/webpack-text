// import str from './hello.js';
// console.log(str);



// import _ from "lodash";
// console.log(_.join(['a','b','c','****']))




// import { add } from './expo'
// add(1,2)

// const _ = require('lodash')
// console.log(_);


import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
    render() {
            return <div>hello world</div>;
    }
}
ReactDom.render(<App />, document.getElementById("app"));


// 引入polyfill
// polyfill ES6+的ECMA规范库(例如promise，async等)
// 全局打包的体积⼤了很多，这是因为polyfill默认会把所有特性注⼊进来，可以在Webpack.config.js修改配置实现按需加载
// import "@babel/polyfill"; 
// es6处理
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//     console.log(item);
// });




// import counter from "./counter";
// import number from "./number";

// counter();
// number();

// 如果开启了HMR,就会有module.hot,利用module.hot.accept来监听文件变化，如果变化就移除原来的， 添加新的
// 可以利用nodejs中global模块（/src/*.js）来获取src下js文件
// vue和react解决HMR可以使用对应的loader来
// if(module.hot){
//     module.hot.accept('./number.js',function(){
//         document.body.removeChild(document.getElementById('number'))
//         number()
//     })
// }





// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function() {
//     var div = document.createElement("div");
//     div.innerHTML = "item";
//     document.body.appendChild(div);
// };



// import axios from 'axios'
// axios.get('/api/mock.json').then(res=>{
//     console.log(res)
// })

// import css from "./css/index.less";
// console.log('css')

// let ele = `<div class=${css.ele}>css module</div>`
// document.write(ele)


// import pic from './images/logo.png'
// var img = new Image()
// img.src = pic
// var root = document.getElementById('root')
// root.append(img)
// console.log(css, css.toString());

