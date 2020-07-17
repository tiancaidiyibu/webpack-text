// 处理入口内容
const fs = require('fs')
const path = require('path')

const parser = require("@babel/parser"); //这是babel7的⼯具，可以静态分析一个模块内部的语法，包括es6，返回⼀个ast抽象语法树
const traverse = require('@babel/traverse').default  // traverse分析ast抽象语法树，根据需要返回对应数据，



const {transformFromAst} = require("@babel/core"); //



module.exports = class webpack {
    constructor(options){
        
        this.options = options
        const { entry,output } = options
        this.entry = entry
        this.output = output

        this.modules = [] //缓存
    }
    parse(entryFile){
        // 开始分析入口模块的内容
        const content = fs.readFileSync(entryFile,'utf-8')
        // parser.parse提出去Ast语法树
        const Ast = parser.parse(content,{
            sourceType:'module'
        })
        // console.log(Ast);
        // console.log(Ast.program.body); //语法树种具体内容

        const dependencies = {};
        // traverse分析ast抽象语法树，根据需要返回对应数据，
        // traverse第一个参数是ast,第二个参数根据node.type来进行配置（import导入的模块type是ImportDeclaration）
        traverse(Ast,{
            ImportDeclaration({node}){
                // console.log(node);
                const newPathname ="./" + path.join(path.dirname(entryFile),node.source.value);  //将路径进行拼接成  ./src/a.js    ./src/b.js
                //根据结果返回对应的模块，定义⼀个对象dependencies 用node.source.value的键，保存newPathname
                dependencies[node.source.value] = newPathname;
            }
        })
        // console.log(dependencies)  //{ './a.js': './src/a.js', './b.js': './src/b.js' }

        // 把代码处理成浏览器可运⾏的代码，需要借助@babel/core，和@babel/preset-env，把ast语法树转换成合适的代码
        const { code } = transformFromAst(Ast,null,{
            presets:['@babel/preset-env']
        })
        // console.log(code)
        // 输出的处理过后的code
        // var _a = _interopRequireDefault(require("./a.js"));
        // var _b = _interopRequireDefault(require("./b.js"));
        // function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
        // console.log("hello,webpack-bundle!");
        return {
            entryFile,
            dependencies,
            code
        }
    }
    

    run(){
        const info = this.parse(this.entry)
        // console.log(info)
        // 开始递归分析其他模块
        this.modules.push(info) //将入口文件处理的返回结果info放入到数组中
        for(let i =0; i<this.modules.length; i++){
            const item  = this.modules[i]
            const { dependencies } = item;
            if(dependencies){
                for(let j in dependencies) {
                    this.modules.push(this.parse(dependencies[j]))
                }
            }
        }
        // console.log(this.modules)
        const obj = {}
        this.modules.forEach(item=>{
            obj[item.entryFile] = {
                dependencies:item.dependencies,
                code:item.code
            }
        })
        // console.log(obj)
        // 生成bundle
        this.file(obj)
    }
    
    file(code){
        // 创建自运行函数，处理require，module，exports
        // 生成main.js =》 dist/main.js
        const filePath = path.join(this.output.path,this.output.filename)
        // console.log(filePath)

        const newCode = JSON.stringify(code);
        const bundle = `(function(graph){
            function require(module){
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath]);
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire, exports,graph[module].code)
                return exports;
            }
            require('${this.entry}')
        })(${newCode})`

        fs.writeFileSync(filePath,bundle,'utf-8')
    }
}



// console.log(Ast.program.body)输出
// [
//     Node {
//       type: 'ImportDeclaration',
//       start: 0,
//       end: 23,
//       loc: SourceLocation { start: [Position], end: [Position] },
//       specifiers: [ [Node] ],
//       source: Node {
//         type: 'StringLiteral',
//         start: 14,
//         end: 22,
//         loc: [SourceLocation],
//         extra: [Object],
//         value: './a.js'
//       }
//     },
//     Node {
//       type: 'ImportDeclaration',
//       start: 24,
//       end: 47,
//       loc: SourceLocation { start: [Position], end: [Position] },
//       specifiers: [ [Node] ],
//       source: Node {
//         type: 'StringLiteral',
//         start: 38,
//         end: 46,
//         loc: [SourceLocation],
//         extra: [Object],
//         value: './b.js'
//       }
//     },
//     Node {
//       type: 'ExpressionStatement',
//       start: 48,
//       end: 85,
//       loc: SourceLocation { start: [Position], end: [Position] },
//       expression: Node {
//         type: 'CallExpression',
//         start: 48,
//         end: 84,
//         loc: [SourceLocation],
//         callee: [Node],
//         arguments: [Array]
//       }
//     }
//   ]
