export function deleteRow(list,i){
    
    for(var n=0;n<list.length;n++){
        if(list[n][1]==i){
            console.log(list.splice(n,14));
            
        }
    }
    // for(let n=0;n<list.length;n++){
    //     list[n][1]=list[n][1]-1;
    // }
    // console.log(list)
}