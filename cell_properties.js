let sheetDb =[]

for(let i = 0; i< rows; i++ ){
    let sheetRow =[]
    for(let j = 0; j<cols; j++){
        let cellProp ={
            bold: false,
            italic: false,
            underline: false,
            alignment: 'left',
            fontFamily: 'monospace',
            fontSize: '14',
            fontColor: '#000',
            bgColor: '#000',  
        }
        sheetRow.push(cellProp);
    }
    sheetDb.push(sheetRow)
}

let activePropColor = '#E9EFEC';
let inactivePropColor = '#ced6e0'
// Selectors for cell properties
let bold = document.querySelector('.bold');
let underline = document.querySelector('.underline');
let italic = document.querySelector('.italic');
let fontFamily = document.querySelector('.font_family_prop');
let fontSize = document.querySelector('.font_size_prop');
let fontColor = document.querySelector('.fontColor_prop');
let bgColor = document.querySelector('.bgColor_prop');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0]
let centerAlign = alignment[1]
let rightAlign = alignment[2]

// application of two-way binding
// Attaching property listener

bold.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    // modifications
    cellProp.bold = !cellProp.bold;  //data change
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; //ui change - 1
    bold.style.backgroundColor = cellProp.bold ? activePropColor : inactivePropColor;  //ui change - 2

})

italic.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    // modifications
    cellProp.italic = !cellProp.italic;  //data change
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal'; //ui change - 1 @cell
    italic.style.backgroundColor = cellProp.italic ? activePropColor : inactivePropColor;  //ui change - 2 @properties bar

})

underline.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    // modifications
    cellProp.underline = !cellProp.underline;  //data change
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none'; //ui change - 1
    underline.style.backgroundColor = cellProp.underline ? activePropColor : inactivePropColor;  //ui change - 2

})

fontSize.addEventListener('change', (e)=> {
    let cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + 'px';
    fontSize.value = cellProp.fontSize
})

fontFamily.addEventListener('change', (e) => {
    cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener('change', (e) => {
    cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

bgColor.addEventListener('change', (e) => {
    cellAddress = addressBar.value;
    let [cell, cellProp] = activeCell(cellAddress);

    cellProp.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
})


alignment.forEach((alignEle) => {
    alignEle.addEventListener('click', (e) => {
        let cellAddress = addressBar.value;
        let [cell, cellProp] = activeCell(cellAddress);
        let alignvalue = e.target.classList[0];
        cellProp.alignment = alignvalue;
        cell.style.textAlign = cellProp.alignment;


        // ui change @ adress bar
        switch(alignvalue){
            case 'left' :
                leftAlign.style.backgroundColor = activePropColor;
                centerAlign.style.backgroundColor = inactivePropColor;
                rightAlign.style.backgroundColor = inactivePropColor;
                break;
            case 'center' : 
                leftAlign.style.backgroundColor = inactivePropColor;
                centerAlign.style.backgroundColor = activePropColor;
                rightAlign.style.backgroundColor = inactivePropColor;
                break;
            case 'right' : 
                leftAlign.style.backgroundColor = inactivePropColor;
                centerAlign.style.backgroundColor = inactivePropColor;
                rightAlign.style.backgroundColor = activePropColor;
                break;
        }
    })
})

// updating address bar UI (active-inactive color) based on cell selection
let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++){
    addEventListenerToEachCellProp(allCells[i]);
}

function addEventListenerToEachCellProp(cell){
    cell.addEventListener('click', (e)=>{
        let cellAddress = addressBar.value;
        let[rid, cid] = decodeAddress(cellAddress);
        let cellProp = sheetDb[rid][cid]
       
    
        // applying cell properties
        cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
        cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
        cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
        cell.style.fontSize = cellProp.fontSize + 'px';
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.background = cellProp.fontFamily;
        cell.style.textAlign = cellProp.alignment;

        bold.style.backgroundColor = cellProp.bold ? activePropColor : inactivePropColor;
        italic.style.backgroundColor = cellProp.italic ? activePropColor : inactivePropColor;
        underline.style.backgroundColor = cellProp.underline ? activePropColor : inactivePropColor;
        fontSize.value = cellProp.fontSize
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;
        switch(cellProp.alignment){
            case 'left' :
                leftAlign.style.backgroundColor = activePropColor;
                centerAlign.style.backgroundColor = inactivePropColor;
                rightAlign.style.backgroundColor = inactivePropColor;
                break;
            case 'center' : 
                leftAlign.style.backgroundColor = inactivePropColor;
                centerAlign.style.backgroundColor = activePropColor;
                rightAlign.style.backgroundColor = inactivePropColor;
                break;
            case 'right' : 
                leftAlign.style.backgroundColor = inactivePropColor;
                centerAlign.style.backgroundColor = inactivePropColor;
                rightAlign.style.backgroundColor = activePropColor;
                break;
        }
    })
}

function activeCell(cellAddress) {
    // destructuring the array
    let [rid, cid] = decodeAddress(cellAddress);

    // accessing cell via cell attributes of rid and cid
    let cell = document.querySelector(`.cell[rid='${rid}'][cid='${cid}']`)
    // accessign storage
    let cellProp = sheetDb[rid][cid]

    return [cell, cellProp]; //we'll need both for two-way binding
}

function decodeAddress(cellAddress){
    // cellAddress: A1
    let rid = Number(cellAddress.slice(1) - 1)  // '1' -> 0
    let cid = Number(cellAddress.charCodeAt(0)) - 65  // 'A' -> 65 - 65 => 0
    return [rid, cid];
}