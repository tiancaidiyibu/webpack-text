const express = require('express')
const app = express()

app.get('/api/info',(req,res)=>{
    res.json({
        name:'Ikki',
        age:18,
        msg:'Ikki happy'
    })
})
app.listen(3001,()=>{
    console.log('启动服务'+3001);
    
})