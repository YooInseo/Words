const express = require("express")
const app = express()
const fs = require('fs')
const wordlist = require('wordlist-english')
var englishWords = wordlist['english'];
const { translate } = require('free-translate');

let json_data = {}

let page = 1;

 
let englishwords_data = []
 

// randomNum(1,10)
	

async function test(target){
    const translatedText = translate(target, { to: 'kr' })
    return translatedText
}

 

// async function randomNum (lower, upper) {
//     for(var i=0; i <=10; i++) {
//       let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
//       let word = englishWords.slice(myRandom,myRandom+1)[0]
//       console.log(word)
//       test(word).then(result =>{
//         console.log(result)
//     })
//     // test(word)
//     //   console.log(word, test(word))
//     }
//   }


const port = 3000

 
 
 
 
app.use(express.static('public'));

app.get('/', (req, res)=>{
   
   
    fs.readFile('./index.html', function(error, data){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
    })
})

app.listen(port, ()=>{
    console.log(`서버가 실행되었습니다. http://localhost:${port}`)
})