 /**
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

document.addEventListener('keydown', (event) => {
    let name = event.key;

    const activeDiv = document.activeElement.closest('[contenteditable]');
    
    if(name == "Enter"){
        event.preventDefault()
        check(words)
    } else if(name =="ArrowRight"){
        if(activeDiv == null){
            event.preventDefault()
            next()
        }
    }
}, false);

window.addEventListener("load", (event) => { 
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
}); 
 
function next(){
    getRows(2).forEach(items => {items?.remove()})
    
    const titleRow = document.getElementsByClassName("title")[2]
    titleRow.getElementsByTagName("th")[2].remove()

    words = []
    for(let i =0; i != 10; i++){
        const randomNumber = random()
        const select = wordList[randomNumber];
     
        words.push(select) 
        
        const engItem = getRows(0)[i]
        engItem.innerText = words[i].English

        const krItem = getRows(1)[i]
        krItem.innerText = ""
        krItem.setAttribute("title", words[i].Korean)
        krItem.setAttribute("style","")
    }
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
    let test = document.getElementsByClassName("title")[2]
    let th = document.createElement('th');
    let td = th.appendChild(document.createElement('h1'));

    td.innerHTML = "정답";
    test.appendChild(th);

    let thead = document.getElementById("thead")
    let tr = thead.getElementsByTagName("tr")
    
    for(let i = 1; i < 11; i++){
        let trObj = tr[i]
        let uaE = trObj.getElementsByTagName("td")[1];

        const ua = trObj.getElementsByTagName("td")[1].innerText
        const oa = words[i - 1].Korean

        if(ua == ""){
            uaE.style.backgroundColor = "#a43232"
        } else{
            if(compare(ua,oa)){
                uaE.style.backgroundColor = "#3aa432"
            } else{
                uaE.style.backgroundColor = "#a43232"
            }
        }
        
        let answerElement = document.createElement("td")
  
        answerElement.innerHTML = words[i - 1].Korean
        trObj.appendChild(answerElement)
 
    }   
    IsCheck = true;
}
 
/**
 * 두개의 값을 받아 비교하여 값을 출력해준다
 * @param {*} Ua 유저의 답변
 * @param {*} Oa 원래 답변 
 * @returns 비교값
 */
function compare(Ua, Oa){   
    if(Oa.indexOf(",") !== -1){
        const Oas = Oa.split(", ")
        const Uas = Ua.split(", ")
        return (Oas[0] == Uas[0] || Oas[1] == Uas[1]) || 
                (Oas[0] == Uas[1] || Oas[1] == Uas )
    } 
    return Ua === Oa
}

function random(){
    return Math.floor(Math.random() * 100);
}
 