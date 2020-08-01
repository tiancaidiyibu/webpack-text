

let express = require('express');
let http = require('http');
class Server {
    constructor(options) {
       this.options = options //{staticDir,port,origin}
        
    }

    async listen(){
        const app = this.app = express()
        app.use(express.static(this.options.staticDir))
        this.httpServer = http.createServer(app)
        return new Promise (resolve=>{
            this.httpServer.listen(this.options.port,()=>{
                console.log(`服务器已经在${this.options.port}端口上启动了`);
                resolve();
            })
        })
    }
    async close (){
        return new Promise(resolve=>{
            this.httpServer.close(this.options.port,()=>{
                console.log(`${this.options.port}端口服务器已经关闭了`);
                resolve();
            })
        })
    }
}

module.exports = Server;