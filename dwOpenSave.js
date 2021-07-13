let download=document.querySelector(".download");
let open =document.querySelector(".open")
let input=document.querySelector(".file_getter")
let newFile=document.querySelector(".newFile");
// let iconContainer=document.querySelector(".sheet_icon");
download.addEventListener("click",function(){
    let a=document.createElement("a");
    let url="data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(worksheetDB));
    a.setAttribute("href",url );
    a.setAttribute("download", "file.json");
    a.click();
    a.remove();
    // console.log(worksheetDB);
    console.log("len=",worksheetDB.length, "worksheet= ",worksheetDB);
})
 open.addEventListener("click",function(){
     input.click();
     input.addEventListener("change",function(){
         console.log("inside loop");
        //  the files are saved in an array
         let filesArr=input.files;
        //  accesing file object from the file array
         let fileObj=filesArr[0];
        //  filereader is used for bigger files
         let fr= new FileReader();
         fr.readAsText(fileObj);
         fr.addEventListener("load",function(){
            let stringData=fr.result;
            worksheetDB=JSON.parse(stringData);
            sheetDB=worksheetDB[0];
            setUI(sheetDB);  
            let len=worksheetDB.length-1;
            for (let i = 0; i < len; i++) {
                addSheetBtn.click();
            }
         })
     })
 })
 newFile.addEventListener("click",function(){
     location.reload();
 })