
function a(){
    var array = [];
    var i = 2000;
    
    while (i < 3000){
        array.push(i);
        i++
    }

    for(var i=0; i<array.length; i++) {
        console.log(array[i]);
    }
    return array[i];
}

console.log(a());