"use strict";
// M V C
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// db connection
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://test_owner:ZDh52OKkGqFw@ep-dry-hill-a5nfk1xt.us-east-2.aws.neon.tech/test?sslmode=require",
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
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
        CREATE TABLE user (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
            console.log(result);
        }
        catch (e) {
            console.log("error=>", e);
        }
    });
}
//createUserTable();
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const values = [username, email, password];
            const res = yield client.query(insertQuery, values);
            // above is  similar as
            // const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
            // but for protection that user can send actual query from client side as input .. we are doing above thing
            // SQL INJECTION thing 
            console.log("Insertion success:", res);
        }
        catch (err) {
            console.error("Error during the insertion:", err);
        }
    });
}
//insertData("parth", "parth@gmail.com", "123");
function fetchDataOfUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            // SELECT * FROM users WHERE email = "useremail@gmail.com"
            console.log("res=>", result);
            if (result.rows.length > 0) {
                console.log('User found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user found with the given email.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
let gotUser = null;
fetchDataOfUser("parth@gmail.com").then((data) => {
    gotUser = data;
    console.log("gotUser-->", gotUser);
}).catch(() => {
    console.log("error in gotUser");
});
