let sheetList=document.querySelector(".sheet_list");
let firstsheet=document.querySelector(".sheet");
let addSheetBtn=document.querySelector(".sheet_icon");
let allCells=document.querySelectorAll(".grid .col");
let addressBar=document.querySelector(".address_bar");
let formulaBar=document.querySelector(".formula_bar");
let clearFormulaBtn=document.querySelector(".formula_icon");
let gridContainer=document.querySelector(".grid_container");
let topLeftBlock=document.querySelector(".top_left_block");
fontSizeBtn=document.querySelector(".font_size");
fontFamilyBtn=document.querySelector(".font_family");
topRow=document.querySelector(".top_row");
leftCol=document.querySelector(".left_col");
firstsheet.addEventListener("click",handleClickedSheet);
addSheetBtn.addEventListener("click",addNewSheet);
let sheetDB=worksheetDB[0];
clearFormulaBtn.addEventListener("click",function(){
    formulaBar.value="";
})
// ******************Sheet***********************
function addNewSheet(){
    console.log("new sheet is added");
    let sheetArr=document.querySelectorAll(".sheet");
    let lastSheet=sheetArr[sheetArr.length-1];
    let lastSheetIdx=lastSheet.getAttribute("sheetIdx");
    lastSheetIdx=Number(lastSheetIdx);
    // creating new sheet
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",lastSheetIdx+1);
    NewSheet.innerText=`Sheet ${lastSheetIdx+1}`;
    sheetArr.forEach(function(sheet){
        sheet.classList.remove("sheet_active");
    })
    NewSheet.classList.add("sheet_active");
    sheetList.appendChild(NewSheet);
    initCurrentSheetDb(); //making 2D array for every new sheet
    sheetDB=worksheetDB[lastSheetIdx];
    initUI();
    NewSheet.addEventListener("click",handleClickedSheet);
}
function handleClickedSheet(e){
    let currSheet=e.currentTarget;
    let sheetArr=document.querySelectorAll(".sheet");

    if(!currSheet.classList[1]){
        sheetArr.forEach(function(sheet){
            sheet.classList.remove("sheet_active");
        })
        currSheet.classList.add("sheet_active");
    }
    let sheetIdx=currSheet.getAttribute("sheetIdx");
    sheetDB=worksheetDB[sheetIdx-1];
    setUI(sheetDB);
}
function initUI(){
    for(let i=0;i<allCells.length;i++){
        allCells[i].style.fontWeight="normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px";
        allCells[i].style.textAlign = "left";
        allCells[i].style.backgroundColor="white";
        allCells[i].style.color="black";
        allCells[i].style.border="1px solid rgb(214, 211, 211)";
        allCells[i].innerText = "";
        formulaBar.value="";
        fontSizeBtn.selectedIndex="0";
        fontFamilyBtn.selectedIndex="0";
        
    }
}
function setUI(sheetDB){
    for(let i=0;i<sheetDB.length;i++){
        for(let j=0;j<sheetDB[0].length;j++){
            let cell=document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            // console.log("cell",cell);
            let {bold,underline,italic,fontFamily,fontSize,bgColor,fontColor,
            halign,value,formula,border,children,}=sheetDB[i][j];
            cell.style.fontWeight= bold == true? "bold":"normal";
            cell.style.fontStyle = italic == true?"italic":"normal";
            cell.style.textDecoration = underline == true?"underline":"none";
            cell.style.fontFamily=fontFamily;
            cell.style.fontSize=fontSize;
            cell.style.backgroundColor= bgColor;
            cell.style.color=fontColor;
            cell.innerText=value;
            // cell.formula=formula;
            // cell.children=children;
            switch(halign){
                case "left":cell.style.textAlign="left";
                            break;
                case "center":cell.style.textAlign="center";
                            break;
                case "right":cell.style.textAlign="right";
                            break;
            }
            switch(border){
                case "UpperBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                                   cell.style.borderTop="2px solid";
                                   break;
                case "LowerBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                                   cell.style.borderBottom="2px solid";
                                    break;
                case "RightBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                                    cell.style.borderRight="2px solid";
                                    break;
                case "LeftBorder": cell.style.border="1px solid rgb(214, 211, 211)";
                                cell.style.borderLeft="2px solid";  
                                break;
                case "NoBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                                break;
                case "fullBorder":cell.style.border="2px solid";
                                  break;
            }
            
        }
    }
}
// ****************Grid*************************
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",handleClickedCell);
    allCells[i].addEventListener("keydown",function(){
        let obj=allCells[i].getBoundingClientRect();
        let height=obj.height;
        let address=addressBar.value;
        let {rid,cid}=getRidCidFromAddress(address);
        let leftCol=document.querySelectorAll(".left_col .left_col_box")[rid];
        leftCol.style.height=height+"px";
    })
}
gridContainer.addEventListener("scroll",function(){
    let top=gridContainer.scrollTop;
    let left=gridContainer.scrollLeft;
    topLeftBlock.style.top=top+"px";
    topRow.style.top=top+"px";
    leftCol.style.left=left+"px";
    topLeftBlock.style.left=left+"px";

})
allCells[0].click();
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("keyup",function(e){
        let currentCell=e.currentTarget;

        if(currentCell.innerText.charAt(0)=="="){
            if(currentCell.innerText!="=")
                formulaBar.value=currentCell.innerText.substring(1);
            if(e.key=="Enter"){
                let address=addressBar.value;
                let spacedFormula=addSpaceToFormula(formulaBar.value);
                let {rid,cid}=getRidCidFromAddress(address);
                let cellObj=sheetDB[rid][cid];
                let prevValue=cellObj.value;
                let isCyclic=false;
                if(cellObj.children.length>0){
                    let formulaTokens=spacedFormula.split(" ");
                    isCyclic = checkForCycle(cellObj,formulaTokens);
                }
                if(isCyclic==false){
                let result=evaluateFormula(spacedFormula,rid,cid);
                let cellObj=sheetDB[rid][cid];
                setValueOnUI(result,rid,cid);
                setValueOnDB(result,spacedFormula,rid,cid);
                changeChildren(cellObj);
                }else{
                    alert(`There are one or more circular refrences where a formula refers to its own cell either directly or indirectly. This might cause them to calculate incorrectly.
                    Try removing or changing these refrences, or moving the formulas to different cells.`)
                    setValueOnUI(prevValue,rid,cid);
                    setValueOnDB(prevValue,"",rid,cid);
                    changeChildren(cellObj);
                    return;
                }
                
            }

        }
    });
}
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("keyup",function(e){
        if(e.key=="Shift"){

            let cell=e.currentTarget;
            console.log(cell);
        }
        
    })
}
function handleClickedCell(e){
    let currentCell=e.currentTarget;
    let parentRow=currentCell.parentNode.parentNode.parentNode.children[1].children;
    let parentCol=currentCell.parentNode.parentNode.parentNode.children[2].children;
    let rid=Number(currentCell.getAttribute("rid"));
    let cid=Number(currentCell.getAttribute("cid"));
    row=rid+1;
    col=String.fromCharCode(65+cid);
    // loops to make the respective rowId and colId highlighted for a sec when cell is clicked
    for(let i=0;i<parentRow.length;i++){
        if(parentRow[i].getAttribute("rboxnum")==cid){
                parentRow[i].classList.add("active_cell");
                setTimeout(function(){
                    parentRow[i].classList.remove("active_cell");
                },2000);
        }
    }
    for(let i=0;i<parentCol.length;i++){
        if(parentCol[i].getAttribute("cboxnum")==rid){
                parentCol[i].classList.add("active_cell");
                setTimeout(function(){
                    parentCol[i].classList.remove("active_cell");
                },2000);
        }
    }
    let cellAdd=col+row;
    addressBar.value=cellAdd;
    let cellObj=sheetDB[rid][cid];
    
    // To show formula of respective cell, set empty when none.
    if(cellObj.formula!=""){
        formulaBar.value=cellObj.formula;
    }else{
        formulaBar.value="";
    }
}
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur",function(){
        let address=addressBar.value;
        let {rid,cid}=getRidCidFromAddress(address);
        let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj=sheetDB[rid][cid];
        // so that not every cell's formula is removed on blurr event
        if(cellObj.value==cell.innerText){
            return;
        }
        // if cell has value different than it's value in db, erase its formula
        if(cellObj.formula!=""){
            removeFormula(cellObj,address);
        }
        // update the cell's db with new value entered
        cellObj.value=cell.innerText;
        // change children of this cell if any.
        changeChildren(cellObj);
    })
}

// ***************Formula*************************
formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter"&&formulaBar!=""){
        let newFormula=formulaBar.value;
        let address=addressBar.value;
        let {rid,cid}=getRidCidFromAddress(address);
        let cellObj=sheetDB[rid][cid];
        let prevFormula=cellObj.formula;
        let prevValue=cellObj.value;
        if(prevFormula==newFormula){
            return;
        }
        if(prevFormula!=""&& prevFormula!=newFormula){
            removeFormula(cellObj,address);
        }
        formula=addSpaceToFormula(newFormula);
        let isCyclic=false;
        if(cellObj.children.length>0){
            let formulaTokens=formula.split(" ");
            isCyclic = checkForCycle(cellObj,formulaTokens);
        }
        if(isCyclic==false){
            let result=evaluateFormula(formula,rid,cid);
            setValueOnUI(result,rid,cid);
            setValueOnDB(result,formula,rid,cid);
            changeChildren(cellObj);
        }else{
            alert(`There are one or more circular refrences where a formula refers to its own cell either directly or indirectly. This might cause them to calculate incorrectly.
            Try removing or changing these refrences, or moving the formulas to different cells.`)
            setValueOnUI(prevValue,rid,cid);
            setValueOnDB(prevValue,"",rid,cid);
            changeChildren(cellObj);
            return;
        }
    }
    
})
function setValueOnDB(result,formula,rid,cid){
    let cellObj=sheetDB[rid][cid];
    cellObj.value=result;
    cellObj.formula=formula;
    let cellFormula=formula;
    let cellAddress=addressBar.value;
    let formulaTokens=cellFormula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ch=formulaTokens[i].charCodeAt(0);
        if(ch>=65 && ch<=90){
            // getting rid and cid of cells used in the formula of current cell.
            let parentRidCidObj=getRidCidFromAddress(formulaTokens[i]);
            let parentCellObj=sheetDB[parentRidCidObj.rid][parentRidCidObj.cid];
            // if [B1]=[2*A1], then we need to update B1(cellAddress) as children of A1(parentCell)
            parentCellObj.children.push(cellAddress);
        }
    }
}
function addSpaceToFormula(formula){
    let newFormula="";
    for(let i=0;i<formula.length;i++){
        let ch=formula.charAt(i);
        if(ch=='('){
            newFormula+=ch+" ";
        }
        else if(isCharacter(ch)===true||isNumber(ch)==true){
            newFormula+=ch;
        }else if(ch=='+'||ch=='-'||ch=='*'||ch=='/'){
            newFormula+=" "+ch+" ";
        }else{
            newFormula+=" "+ch;
        } 
    }

    return newFormula;
}
function evaluateFormula(formula){
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ch=formulaTokens[i].charCodeAt(0);
        if(ch>=65 && ch<=90){
            // console.log("ch=",ch, "and token=",formulaTokens[i]);
            let {rid,cid}=getRidCidFromAddress(formulaTokens[i]);
            let cellObj=sheetDB[rid][cid];
            let {value}=cellObj;
            formula=formula.replace(formulaTokens[i],value);
        }
    }
    let ans=calculateResult(formula);
    return ans;
    
}
function checkForCycle(cellObj,formulaTokens){
    if(cellObj.children.length==0){
        return false;
    }
    for(let c=0;c<cellObj.children.length;c++){
        for(let i=0;i<formulaTokens.length;i++){
            let ch=formulaTokens[i].charCodeAt(0);
            if(ch>=65 && ch<=90){
                if(cellObj.children[c].includes(formulaTokens[i])){
                    return true;
                }
                let {rid,cid}=getRidCidFromAddress(cellObj.children[c]);
                let ChildcellObj=sheetDB[rid][cid];
                let isCyclic=checkForCycle(ChildcellObj,formulaTokens);
                if(isCyclic==true){
                    return true;
                }
            }
        }

    }
    return false;
}
function calculateResult(formula){
    formula=formula.split(" ");
    let operand=[];
    let operator=[];
       for(let i=0;i<formula.length;i++){
           let ch=formula[i];
           if(ch=='('){
               operator.push(ch);
           }else if(isNumber(ch)==true){
               operand.push(Number(ch));
           }else if(ch=='+'||ch=='-'||ch=='*'||ch=='/'){
               while(operator.length>0 && operator[operator.length-1]!='('&& precedence(ch)<=precedence(operator[operator.length-1])){
                   let op=operator.pop();
                   let val2=operand.pop();
                   let val1=operand.pop();
                   let result=calculate(val1,val2,op);
                   operand.push(result);
               }
               operator.push(ch);
           }else if(ch==')'){
               while(operator.length>0 && operator[operator.length-1]!='('){
                   let op=operator.pop();
                   let val2=operand.pop();
                   let val1=operand.pop();
                   let result=calculate(val1,val2,op);
                   operand.push(result);
               }
               operator.pop();
           }
       }
       while(operator.length!=0){
               let op=operator.pop();
                   let val2=operand.pop();
                   let val1=operand.pop();
                   let result=calculate(val1,val2,op);
                   operand.push(result);   
       }
    console.log(operand[operand.length-1]);
    return operand[operand.length-1];
}
function setValueOnUI(result,rid,cid){
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.innerText=result;
}
function changeChildren(cellObj){
    // console.log("Change children is called for ",cellObj)
    let childrenArr=cellObj.children;
    for(let i=0;i<childrenArr.length;i++){
        console.log("change children is called for",childrenArr[i]);
        let childAdd=childrenArr[i];
        let childRIDCID=getRidCidFromAddress(childAdd);
        let childCellObj=sheetDB[childRIDCID.rid][childRIDCID.cid];
        let childFormula=childCellObj.formula;
        // console.log(childFormula);
        let result=evaluateFormula(childFormula,childRIDCID.rid,childRIDCID.cid);
        childCellObj.value=result;
        setValueOnUI(result,childRIDCID.rid,childRIDCID.cid,);
        changeChildren(childCellObj);

    }
   
}
function removeFormula(cellObj,address){
    console.log("Reove formula is called for,",address);
    let formula=cellObj.formula;
    if(formula==""){
        console.log("formula is empty");
    }
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ch=formulaTokens[i].charCodeAt(0);
        if(ch>=64 && ch<=90){
            let parentRidCid=getRidCidFromAddress(formulaTokens[i]);
            let parentCellObj=sheetDB[parentRidCid.rid][parentRidCid.cid];
            let parentChildrenArr=parentCellObj.children;
            let idx=parentChildrenArr.indexOf(address);
            parentChildrenArr.splice(idx,1);
        }
    }
    cellObj.formula="";

}
// ******************Helper function*********************
function getRidCidFromAddress(address){
    //A1
    let colAdd=address.charCodeAt(0);
    let rowAdd=address.slice(1);
    let rid=Number(rowAdd)-1;
    let cid=colAdd-65;
    return {rid,cid};
}
function isCharacter(ch){
    return (/[a-zA-Z]/).test(ch);
}
function isNumber(ch){
    return(/[0-9]/).test(ch);
}
function precedence(op){
    if(op=='+'){
        return 1;
    }else if(op=='-'){
        return 1;
    }else if(op=='*'){
        return 2;
    }else{
        return 2;
    }
}
function calculate(v1,v2,op){
    if(op=='+'){
       return v1+v2;
   }else if(op=='-'){
       return v1-v2;
   }else if(op=='*'){
       return v1*v2;
   }else{
       return v1/v2;
   }
}