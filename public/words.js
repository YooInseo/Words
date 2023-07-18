 /**
 * 로그인 방식
 * 이메일을 입력하면 로그인 입력 url을 전송하여 비밀번호를 입력하지 않아도 된다.
 * 
 * 시험을 다 본 후 next를 누르면 다음 단어로 넘어감, (이전의 단어는 나오지 않음)
 * 이전 기록은 저장이 됨.
 * 제출을 할 시 점수 데이터가 그래프화되서 표시가 되며, 자신이 틀린 기록들을 볼 수 있다.
 * 
 * reset을 누르면 시험 결과가 초기화됨
 */
let Ishint = false;

let IsCheck = false;
//선택된 단어
let words = new Array();

const wordList = []

let score = 0;

window.addEventListener("load", (event) => {    
    const point = document.getElementById("point")
    point.innerHTML = `점수 : ${score} / 10`


    fetch('http://localhost:3000/words.json',{
        method: 'GET',
        headers: {
            'Accpet': 'application/json'
        }
     }).then(response => response.json())
     .then(response =>{
 
        for(words of response.words){
            wordList.push(words)
        }
        newWords()         
     })

     let checkButton = document.getElementById("check")
     checkButton.addEventListener("click", function(){
        check(words)
     })

    let nextButton = document.getElementById("next")
    nextButton.addEventListener("click", function(){
        next();
    })
  
    let hintButton = document.getElementById("hint")
    hintButton.addEventListener("click", function(){
        hint(hintButton)
    })
    
});
function hint(button){
    var table = document.getElementById("myTable"); // 표 가져오기

    if(!Ishint){
        button.innerHTML = "뜻 숨기기"
        Ishint = true

  
        var rowCount = table.rows.length; // 기존 행 개수
        var firstCell = table.rows[0].insertCell(); // 기존 행에 새로운 셀(열) 추가
        firstCell.innerHTML = "정답"
    
        let cells = []
         // 기존 행에 열 추가
         for (var i = 1; i < rowCount; i++) {
            var newCell = table.rows[i].insertCell(); // 기존 행에 새로운 셀(열) 추가
            // newCell.innerHTML = "테스트"; // 내용 설정 (원하는 내용으로 변경 가능)
            cells.push(newCell)
        }
        for(let i = 0; i < 10; i++){
            cells[i].innerHTML =  words[i].Korean
        }
    } else{
        button.innerHTML = "뜻 보기"
        Ishint = false
 
        if(table.rows[0].cells[2] != null){
            var row = table.rows[0]
            row.deleteCell(2)
            for(i = 1; i<table.rows.length; i++){
                var row = table.rows[i]
                row.deleteCell(2)
            }
          
        }
    
        // var tableHeaderRowCount = 1;
        // var rowCount = table.rows.length;
        // for (var i = tableHeaderRowCount; i < rowCount; i++) {
        //     table.deleteRow(tableHeaderRowCount);
        // }
    }
}

function reset(){
    var table = document.getElementById("myTable");

    if(table.rows[0].cells[2] != null){
        var row = table.rows[1]
        row.deleteCell(3)
    }
   
  
}

function next(){
    var table = document.getElementById("myTable");

    if(IsCheck == false){
        alert("check 버튼을 눌러주세요!")
        return;
    }

     if(table.rows[0].cells[2] != null){
        var row = table.rows[0]
        row.deleteCell(1)
    }

    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    newWords();
    IsCheck = false
    let title = document.getElementById("title");

    title.innerHTML  = wordList.length + "개 단어!";
}


function newWords(){
    words = []
    for(let i =0; i != 10; i++){
        const randomNumber = random()
        const select = wordList[randomNumber];

        words.push(select)

        removeItemOnce(wordList, select) 
        addRow(select.English, select.Korean, i)
    }
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

function check(words){

    if(IsCheck){
        alert("이미 체점을 하셨습니다 다음을 눌러주세요")
        return;
    }
    var table = document.getElementById("myTable"); // 표 가져오기
 
    var rowCount = table.rows.length; // 기존 행 개수
    var firstCell = table.rows[0].insertCell(); // 기존 행에 새로운 셀(열) 추가
    firstCell.innerHTML = "정답"

    let cells = []
     // 기존 행에 열 추가
     for (var i = 1; i < rowCount; i++) {
        var newCell = table.rows[i].insertCell(); // 기존 행에 새로운 셀(열) 추가
        // newCell.innerHTML = "테스트"; // 내용 설정 (원하는 내용으로 변경 가능)
        cells.push(newCell)
    }

    for(let i =0; i != 10; i++){
        let div = document.getElementById(i);
        let value = div.textContent
        
         
            let Korean = words[i].Korean
            if(value === Korean){
                div.style.backgroundColor = "#91f330"
                score++;
                point.innerHTML = `점수 : ${score} / 10`
                removeItemOnce(wordList, words[i])
                console.log(words[i])
            } else{
                cells[i].innerHTML = Korean
                console.log(cells[i].innerHTML)
                div.style.backgroundColor = "#f33030" 
                
                wordList.push(words[i])
                
            }

            IsCheck = true;
       
    }
       
    
    console.log(wordList)
   
}

function createCell(cell, text, style) {
        var div = document.createElement('div'), // create DIV element
            txt = document.createTextNode(text); // create text node
        div.appendChild(txt);                    // append text node to the DIV
        div.setAttribute('class', style);        // set DIV class attribute
        div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
        cell.appendChild(div);                   // append DIV to the table cell
}

function random(){
    return Math.floor(Math.random() * 100);
}


function addRow(English, Korean,id ) {
    var table = document.getElementById("myTable");
    
    var rows = table.getElementsByTagName("tr").length;
    var row = table.insertRow(rows);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(1);
 
    cell3.setAttribute("contenteditable","True")
    cell3.setAttribute("id",id)
    
    cell2.innerHTML = English;
    cell3.innerHTML = "";

}

function addWords(array, words){
    if(array.length < 10){
        array.push(words)
    }  
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
 