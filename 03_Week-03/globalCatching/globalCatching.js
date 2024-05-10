const express = require("express");
const app = express();

app.use(express.json());

app.post("/test", (req, res)=>{
    //const kidney = [ 1, 2 ];

    const kidneyLength = kidney.length ;

    res.send("you have "+ kidneyLength + "kidneys");

})


// GLOBAL CATCHES  || ERROR BASED MIDDLEWARE
// PUT AT THE END AFTER ALL ROUTES
// if there problem with above functions and if server is going to be crash and sending rubbish/trash things to user
// then this middleware can handle it
// ever there is expection,error in above functions then it handles it

app.use(function(err, res, res, next){
    console.log("error=>", err);
    res.send("Server fat gaya kidhar");
})


app.listen(4000, ()=>{
    console.log("listenining on 4000 port");
}); 
