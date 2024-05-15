// Learn to work with functions as parameters in TypeScript.

// : ()=> void 
// above is dataType of function that is going to receive as argument
// here void is RETURN TYPE
// 

function runAfter1s (receivedFunc: ()=> void) {
    setTimeout(receivedFunc, 1000);
}

runAfter1s( function(){console.log("hii")} )

// ========================================================
// ()=> number
// here that received function in param return number

function withReturnTypeArg( func: ()=> number ){
    func();
}

withReturnTypeArg(
    function printingAndReturningNum(){
        console.log("printing num here is 2");
        return 2 ;
    }
)
