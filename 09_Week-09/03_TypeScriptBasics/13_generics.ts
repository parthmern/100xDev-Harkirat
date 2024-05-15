function firstEl ( arr : (number|string)[]){
    console.log("first ele=>", arr[0]);
    return(arr[0]) ;
}

const ans1 = firstEl([1,2,3]);
const ans2 = firstEl(["parth", "parth"]);

// Problem1
// const upAns1 = ans1.toUpperCase() ; // error bcz TS thinks that ans1 is number or string so cannot understand toUpeerCase function
// TS is not able to figure out the ans is number or string

// problem2
const ans3 = firstEl([1,2,3, "parth"]) ;  // here i am sending both number and string in one array
// but i want either number array or string array

// ==============================================================
// solution -> Generics

function identity<T>(arg: T): T {
    return arg;
}

// here user is setting the datatype while calling 
let output1 = identity<string>("myString");         // here <string> is dataType for function T = string like this 
let output2 = identity<number>(100);                // here <number> is dataType for function T = number like this


// solution for first que

function firstElement <T> (arr : T[]) : T{
    return arr[0];
}

let a1 = firstElement<string>(["parth", "patel"]); 
let a2 = firstElement<number>([1, 2]);  

// let a3 = firstElement<number>([1, "parth"]);      // this will give error
  