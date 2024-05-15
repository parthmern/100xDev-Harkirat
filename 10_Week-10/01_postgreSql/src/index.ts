// M V C

// db connection
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://test_owner:ZDh52OKkGqFw@ep-dry-hill-a5nfk1xt.us-east-2.aws.neon.tech/test?sslmode=require",
});

client
  .connect()
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log("error in db connection", e);
  });

// write a function to create user table in DB

async function createUserTable() {
  try {
    const result = await client.query(`
        CREATE TABLE user (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(result);
  } catch (e) {
    console.log("error=>", e);
  }
}

//createUserTable();

async function insertData(username: string, email: string, password: string) {
  try {
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);

    // above is  similar as
    // const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    // but for protection that user can send actual query from client side as input .. we are doing above thing
    // SQL INJECTION thing 

    // "INSERT INTO users (username, email, password) VALUES (";DROP TABLE User;", $2, $3)";
    // sql will drop table 
    // how to protect

    // const res = await client.query(insertQuery, [";DROP TABLE User;", "s","hi"]);
    // but in this case it is like value sql count it as value not command

    console.log("Insertion success:", res);
  } catch (err) {
    console.error("Error during the insertion:", err);
  } 
}

//insertData("parth", "parth@gmail.com", "123");

async function fetchDataOfUser(email:string) {

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);
        // SELECT * FROM users WHERE email = "useremail@gmail.com"

        console.log("res=>", result);
    
        if (result.rows.length > 0) {
          console.log('User found:', result.rows[0]);
          return result.rows[0];
        } else {
          console.log('No user found with the given email.');
          return null;
        }
      } catch (err) {
        console.error('Error during fetching user:', err);
        throw err;
      } finally {
        await client.end();
      }
    
}

let gotUser = null ;

fetchDataOfUser("parth@gmail.com").then((data)=>{
    gotUser = data ;
    console.log("gotUser-->", gotUser);
}).catch(()=>{
    console.log("error in gotUser");
})
