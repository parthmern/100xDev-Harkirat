type arrayType = number[] ; // we cannot use interface here

// function printingArr ( arr : number[] ) { ... }            // can do like this

function printingArr ( arr : arrayType ){
    console.log(arr[0]);
}

printingArr([1,2,3]);