let topRow=document.querySelector(".top_row");
let leftCol=document.querySelector(".left_col");
let gridEle=document.querySelector(".grid");
// top alphabetical row
let str="";
for(let i=0;i<26;i++){
    str+=`<div class="top_row_box" rboxnum="${i}">${String.fromCharCode(65+i)}</div>`;
}
topRow.innerHTML=str;
// left number col
str="";
for(let i=1;i<=100;i++){
    str+=`<div class="left_col_box" cboxnum="${i-1}">${i}</div>`;
}
leftCol.innerHTML=str;
// grid
str="";
for(let i=0;i<100;i++){
    str+=`<div class="row">`
    for(let j=0;j<26;j++){
        str+=`<div class='col' rid=${i} cid=${j} contenteditable="true"></div>`
    }
    str+=`</div>`
}
gridEle.innerHTML=str;

// database
let worksheetDB=[];
function initCurrentSheetDb(){
    let sheetDB=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let cell={
                bold:false,
                italic:false,
                underline:false,
                fontFamily:"Arial",
                fontSize:"16",
                bgColor:"white",
                fontColor:"black",
                halign:"left",
                value:"",
                formula:"",
                border:"1px solid rgb(214, 211, 211)",
                children:[],
            }
            row.push(cell);
        }
        sheetDB.push(row);
    }
    worksheetDB.push(sheetDB);
// console.log(worksheetDB);
}
initCurrentSheetDb();
