const express = require("express")
const app = express()
const fs = require('fs')
 
const port = 80

app.use(express.static('public'));

app.get('/', (req, res)=>{
   
   
    fs.readFile('./test.html', function(error, data){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
    })
})

app.listen(port, ()=>{
    console.log(`서버가 실행되었습니다. http://localhost:${port}`)
})