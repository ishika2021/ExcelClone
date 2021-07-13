// addressBar=document.querySelector(".address_bar");
let boldBtn=document.querySelector(".bold");
let underlineBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");
let fontFamilyBtn=document.querySelector(".font_family");
let fontSizeBtn=document.querySelector(".font_size");
let fontIncBtn=document.querySelector(".big_font");
let fontDecBtn=document.querySelector(".small_font");
let bgColorBtn=document.querySelector("#bg-color");
let fontColorBtn=document.querySelector('#color');
let bgColorBox=document.querySelector(".fill_color_box");
let fontColorBox=document.querySelector(".font_color_box");
let borderBtn=document.querySelector(".cell_border");
let fullBorderBtn=document.querySelector(".full_border");
let alignmentArr=document.querySelectorAll(".align_icon");
let root=document.querySelector(":root");

// ********************FONT STYLE BUTTONS******************
boldBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let isActive=boldBtn.classList.contains("button_active");
    let cellObj=sheetDB[rid][cid];
    console.log(cellObj);
    if(isActive==false){
        boldBtn.classList.add("button_active");
        cell.style.fontWeight="bold";
        cellObj.bold=true;
    }else{
        boldBtn.classList.remove("button_active");
        cellObj.bold=false;
        cell.style.fontWeight="normal";
    }
})
underlineBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let isActive=underlineBtn.classList.contains("button_active");
    let cellObj=sheetDB[rid][cid];
    if(isActive==false){
        underlineBtn.classList.add("button_active");
        cell.style.textDecoration="underline";
        cellObj.underline=true;
        
    }else{
        underlineBtn.classList.remove("button_active");
        cell.style.textDecoration="none";
        cellObj.underline=false;
    }
})
italicBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let isActive=italicBtn.classList.contains("button_active");
    let cellObj=sheetDB[rid][cid];
    if(isActive==false){
        italicBtn.classList.add("button_active");
        cell.style.fontStyle="italic";
        cellObj.italic=true;
    }else{
        italicBtn.classList.remove("button_active");
        cell.style.fontStyle="normal";
        cellObj.italic=false;
    }
})
// ********************FONT PROPERTIES BUTTONS*****************
fontFamilyBtn.addEventListener("change",function(){
    let address=addressBar.value;
    let family=fontFamilyBtn.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily=family;
    let cellObj=sheetDB[rid][cid];
    cellObj.fontFamily=family;

})
fontSizeBtn.addEventListener("change",function(){
    let address=addressBar.value;
    let fontSize=fontSizeBtn.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontSize+"px";
    let cellObj=sheetDB[rid][cid];
    cellObj.fontSize=fontSize;
})
fontIncBtn.addEventListener("click",function(){
    let fontSize=fontSizeBtn.value;
    fontSize=Number(fontSize);
    console.log(typeof(fontSize),fontSize);
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj=sheetDB[rid][cid];
    if(fontSize<50){
        fontSize=fontSize+8;
        switch(fontSize){
            case 18: fontSizeBtn.selectedIndex="1";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 26: fontSizeBtn.selectedIndex="2";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 34: fontSizeBtn.selectedIndex="3";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 42: fontSizeBtn.selectedIndex="4";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 50: fontSizeBtn.selectedIndex="5";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
        }
    }
})
fontDecBtn.addEventListener("click",function(){
    let fontSize=fontSizeBtn.value;
    fontSize=Number(fontSize);
    console.log(typeof(fontSize),fontSize);
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj=sheetDB[rid][cid];
    if(fontSize>10){
        fontSize=fontSize-8;
        switch(fontSize){
            case 18: fontSizeBtn.selectedIndex="1";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 26: fontSizeBtn.selectedIndex="2";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 34: fontSizeBtn.selectedIndex="3";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 42: fontSizeBtn.selectedIndex="4";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
            case 50: fontSizeBtn.selectedIndex="5";
                     cell.style.fontSize=fontSize+"px";
                     cellObj.fontSize=fontSize;
                     break;
        }
    }
})
// *******************Cell Color and border***********************
bgColorBtn.addEventListener("change",function(){
    let color=bgColorBtn.value;
    console.log(color);
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor=color;
    root.style.setProperty('--bgColor',color);
    let cellObj=sheetDB[rid][cid];
    cellObj.bgColor=color;

})
fontColorBtn.addEventListener("change",function(){
    let color=fontColorBtn.value;
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color=color;
    root.style.setProperty('--fontColor',color);
    let cellObj=sheetDB[rid][cid];
    cellObj.fontColor=color;

})
bgColorBox.addEventListener("click",function(){
    let color=getComputedStyle(root).getPropertyValue('--bgColor');
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor=color;
    let cellObj=sheetDB[rid][cid];
    cellObj.bgColor=color;
})
fontColorBox.addEventListener("click",function(){
    let color=getComputedStyle(root).getPropertyValue('--fontColor');
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color=color;
    let cellObj=sheetDB[rid][cid];
    cellObj.fontColor=color;
})
borderBtn.addEventListener("change",function(){
    let borderStyle=borderBtn.value;
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj=sheetDB[rid][cid];
    switch(borderStyle){
        case "UpperBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                           cell.style.borderTop="2px solid";
                           cellObj.border="UpperBorder";
                           break;
        case "LowerBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                           cell.style.borderBottom="2px solid";
                           cellObj.border="LowerBorder";
                           break;
        case "RightBorder":cell.style.border="1px solid rgb(214, 211, 211)";
                           cell.style.borderRight="2px solid";
                           cellObj.border="RightBorder";
                           break;
        case "LeftBorder": cell.style.border="1px solid rgb(214, 211, 211)";
                           cell.style.borderLeft="2px solid";  
                           cellObj.border="LeftBorder";
                           break;
        case "NoBorder":   cell.style.border="1px solid rgb(214, 211, 211)";
                           cellObj.border="NoBorder";
                           break;
    }
})
fullBorderBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.border="2px solid";
    let cellObj=sheetDB[rid][cid];
    cellObj.border="fullBorder";
})
// *******************Font Alignment*********************************
for(let i=0;i<alignmentArr.length;i++){
    alignmentArr[i].addEventListener("click",function(e){
        let icon=e.currentTarget;
        let address=addressBar.value;
        let {rid,cid}=getRidCidFromAddress(address);
        let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj=sheetDB[rid][cid];
        let alignType=icon.classList[3];
        cellObj.halign=alignType;
        switch(alignType){
            case "left":cell.style.textAlign="left";
                        break;
            case "center":cell.style.textAlign="center";
                        break;
            case "right":cell.style.textAlign="right";
                        break;
        }

    })
}

// ********************Helper Function*******************************
function getRidCidFromAddress(address){
    //A1
    let colAdd=address.charCodeAt(0);
    let rowAdd=address.slice(1);
    let rid=Number(rowAdd)-1;
    let cid=colAdd-65;
    return {rid,cid};
}