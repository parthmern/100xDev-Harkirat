// when to use type and iterface

interface UserType {
    age : number ;
}

// can only use inter face to extend something which may be interface or type
interface ManagerType extends UserType {
    name : number ;
}   


// for union or intersection only TYPE
type both = UserType | ManagerType ;

// ==========================================================================
// give example of callback where the called function accepts two arguments and return string

function mainFunc ( cb1: ()=>void , cb2 : (name : string , age : number) => string ) : string {
    cb1();
    cb2("parth", 12); 
    
    return "1";
}

function cb1(): void{
    // cb1 called
}

function cb2(name : string , age : number ): string{
    return name ;
}

