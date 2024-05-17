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


insertUser("admin2", "789456", "dhruv", "patel");

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


