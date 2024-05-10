const express = require("express");
const app = express();

app.use(express.json());

// all this functions with routes always have NEXT function (req, res, next) is still present here 
// so if there is error then it can go directly on global catch function using next function 
app.post("/test", (req, res)=>{

    // if i am not using try catch block then it will not go to GLOBAL ERROR CATCH block last middleware
    throw new Error("some error here");
})

let totalError = 0 ;

// ERROR HANDLING MIDDLEWARE
// GLOBAL CATCHES  || ERROR BASED MIDDLEWARE
// PUT AT THE END AFTER ALL ROUTES
// if there problem with above functions and if server is going to be crash and sending rubbish/trash things to user
// then this middleware can handle it
// ever there is expection,error in above functions then it handles it

app.use(function(err, res, res, next){
    console.log("error=>", err);
    totalError ++ ;
    console.log("totoal error=>", totalError);
    res.status(400).send("Server fat gaya kidhar");
    
})


app.listen(4000, ()=>{
    console.log("listenining on 4000 port");
}); 
