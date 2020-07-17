console.log('sssss23')
import less from './css/index.less'
// import src from './entryArray'

// console.log(aa())

import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
    render() {
            return <div>hello world</div>;
    }
}
ReactDom.render(<App />, document.getElementById("app"));

import '@babel/polyfill'
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
    console.log(item);
});





// import axios from 'axios'
// axios.get("/api/mock.json").then(res => {
//     console.log(res);
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