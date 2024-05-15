// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.

// here for key pressing we have 4 options like up, down, left,right


type keyPressedType = "up" | "down" | "left" | "right" ;

function pf(keyType : keyPressedType){
    console.log(keyType);
}

pf("up"); // no error
// pf("uppp"); // error

// ==============================================================================
// using ENUM

enum direction {
    up,     // 1
    down,   // 2
    left ,  // 3
    right   // 4
}

function printing(key : direction){
    console.log(key); // will print 0 for UP

    if(key == direction.up){
        console.log("this is UP key");
    }

}

printing(direction.up) ; 


// ========================

enum directionWithValue {
    up = "Up",     // Up
    down = "Down",   // Down
    left = "left" ,  // left
    right = "right"   // right
}