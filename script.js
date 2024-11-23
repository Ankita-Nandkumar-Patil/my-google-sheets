let rows = 100;
let cols = 26;

let addressColCont = document.querySelector('.address_col_cont')
let addressRowCont = document.querySelector('.address_row_cont')
let cellCont = document.querySelector('.cell_cont')
let addressBar = document.querySelector('.address_bar')

// logic for creating rows dynamically
for(let i=0 ; i< rows ; i++){
    let addressCol = document.createElement('div');
    addressCol.setAttribute('class','address_col');
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol)
}

//logic for dynamically adding columns
for( let i=0; i<cols; i++){
    let addressRow = document.createElement('div');
    addressRow.setAttribute('class', 'address_row')
    addressRow.innerText = String.fromCharCode(65 + i)  //ascii for A ==65
    addressRowCont.appendChild(addressRow)
}

// logic for adding cells
for (let i=0 ; i<rows ; i++){
    let rowCont = document.createElement('div');
    rowCont.setAttribute('class', 'row_cont');
    for(j=0; j<cols; j++){
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('contenteditable', 'true')
        rowCont.appendChild(cell)
        addListnerForAdressBarDisplay(cell, i, j);
    }
    cellCont.appendChild(rowCont)
}


//logic for adding cell location in address bar
function addListnerForAdressBarDisplay(cell, i, j){
    cell.addEventListener('click', (e) =>{
        let rowId = i+1;
        let colId = String.fromCharCode(j + 65)
        addressBar.value = `${colId}${rowId}`
    })
}