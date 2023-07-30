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

let step = 0;


/**
 * Save point by step for showing data table after 10 steps
 * 
 */
let points = []

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
 
    if(name == "Enter"){
        event.preventDefault()
        check(words)
    } else if(name =="ArrowRight"){
        event.preventDefault()
        next()
    }
  }, false);

window.addEventListener("load", (event) => {    
    const point = document.getElementById("point")
    point.innerHTML = `점수 : ${score} / 10`


    fetch('http://localhost/words.json',{
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
    points.push(score)
    console.log(score)
    updatePoint(0)

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
    nextStep();

    IsCheck = false
    
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
            console.log("Korean", Korean ,"Value", value, "Equal", value === Korean)
        
            if(value === Korean){
                div.style.backgroundColor = "#91f330"
                score++;
                updatePoint(score)
                removeItemOnce(wordList, words[i])
                console.log(words[i])
            } else{
                cells[i].innerHTML = Korean
                console.log(cells[i].innerHTML)
                div.style.backgroundColor = "#ff9292e9" 
                
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

function nextStep(){
    
    if(step != 10){
        step++
        
     
        const stepHTML = document.getElementById("step")
        stepHTML.innerHTML = `${step} / 10`
    } else{
        const table = document.getElementById("myTable")
        table.remove();
        console.log(points)
        const canvas = document.createElement("canvas")
        document.body.appendChild(canvas)
        canvas.style.display = "inline-block"
        canvas.style.maxWidth = "500px"
        canvas.style.maxHeight = "300px"


        new Chart(canvas, {
            type: 'bar',
            data: {
              labels: ["1", "2", "3", "4", "5" , "6","7","8","9","10"],
              datasets: [
                {
                  label: "점수",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: points
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              },
              scales:{
                y:{
                    min: 0,
                    max: 10
                }
              }
            }
        });
    }
 
}

function updatePoint(newPoint){
    score = newPoint
    const point = document.getElementById("point")
    point.innerHTML = `점수 : ${score} / 10`
}

 