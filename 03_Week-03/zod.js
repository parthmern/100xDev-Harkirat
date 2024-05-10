const express = require("express");
const app = express();
app.use(express.json());

const zod = require("zod"); // [ 1, 2 ]  --> input should be like this
const schema = zod.array(zod.number());

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.post("/test", (req, res) => {
  // this should be input
  //const kidney = [ 1, 2 ];

  const {kidney} = req.body;

  const zodResponseSafeParse = schema.safeParse(kidney);
  const zodResponseParse = schema.parse(kidney);

  if(!zodResponseSafeParse.success){
  
    res.status(400).send("you sent wrong input");
  }

  const kidneyLength = kidney.length;

  res.status(200).json({message : "you have " + kidneyLength + " kidneys" , zodResponseSafeParse, zodResponseParse} );
});

app.listen(3000, () => {
  console.log("server started");
});

// =======================================
// {
//   email : "qpmzj@example.com" ,
//   password : "string" , 
//   country : "IN", "US",
// }

const zodSchema = zod.object(
  {
    email : zod.string() ,
    password : zod.string() ,
    country : zod.string().enum(["IN", "US"]) ,
  }
)