
/**
 * Getting table row from head 
 * @param {*} index select row by index
 * @returns rows on index
 */
function getRows(index){
    let rows = []
    let thead = document.getElementById("thead")
    let tr = thead.getElementsByTagName("tr")
    for(let i = 1; i < 11; i++){
        let trObj = tr[i]

        let uaE = trObj.getElementsByTagName("td")[index];
        rows.push(uaE)
    }
    return rows;
}
function getCell(i){
    let thead = document.getElementById("thead")
    let tr = thead.getElementsByTagName("tr")[i]
    return {tr};
}


function addRow(English, Korean,id) {
    var table = document.getElementById("myTable");
    
    var rows = table.getElementsByTagName("tr").length;
    var row = table.insertRow(rows);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(1);
    
    cell3.setAttribute("title",Korean)
    cell3.setAttribute("contenteditable","True")
    cell3.setAttribute("class","contents")
    cell3.setAttribute("id",id)
  
    cell2.innerHTML = English;
    cell3.innerHTML = "";
}


 //Remove Every rows in Answer 
    getRows(2).forEach(items => {items?.remove()})

    const engRow = getRows(0);
    const krRow = getRows(1);
     const titleRow = document.getElementsByClassName("title")[2]
    titleRow.getElementsByTagName("th")[2].remove()

    words = []
    for(let i =0; i != 10; i++){
        const randomNumber = random()
        const select = wordList[randomNumber];

        words.push(select)

      
    }
    engRow.forEach(items =>{
        const index = engRow.indexOf(items)
        items.innerText = words[index].English
    })
    
    krRow.forEach(items =>{
        const index = krRow.indexOf(items)
        items.innerText = ""
        items.setAttribute("title", words[index].Korean)
        items.setAttribute("style","")
    })

    IsCheck = false