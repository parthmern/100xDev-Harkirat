import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// it is like
// import mongoose from "mongoose";
// mongoose.connect();

// you have imported a library and
// it has names of all tables of your DB
// some new code will put in your modules
// all this code geenrated "auto generated client" will generate from schema.prisma

// ==> prisma.user


async function insertUser(username: string, password: string, firstName: string, lastName: string) {

    const res = await prisma.user.create(
        {
            // data -> that you want to send as request
            data : {
                email : username ,
                password : password ,
                firstName : firstName ,
                lastName : lastName ,
            },
            // select -> that you want from response
            select : {
                id : true ,
                password : true ,
            }
        }
    );

    console.log("res of insterting user ->", res);

    gettingAllUser();
  
}


//insertUser("admin1", "12345", "parth", "patel");

async function gettingAllUser(){
    const res = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
    
      console.log("all users ==>", res);
}


// =================
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, { firstName, lastName }: UpdateParams) {
    const res = await prisma.user.update({
        // here email should be @unique in mode so that there is not error while using "where"
        where: {
            email: username , // Here, email is used to find the user
        } ,
        data: {
            firstName: firstName,
            lastName: lastName,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
        }
    });
    console.log(res);
}

updateUser("admin1", {
    firstName: "new name",
    lastName: "singh"
});

