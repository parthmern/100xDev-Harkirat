"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// it is like
// import mongoose from "mongoose";
// mongoose.connect();
// you have imported a library and
// it has names of all tables of your DB
// some new code will put in your modules
// all this code geenrated "auto generated client" will generate from schema.prisma
// ==> prisma.user
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            // data -> that you want to send as request
            data: {
                email: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
            },
            // select -> that you want from response
            select: {
                id: true,
                password: true,
            }
        });
        console.log("res of insterting user ->", res);
        gettingAllUser();
    });
}
//insertUser("admin1", "12345", "parth", "patel");
function gettingAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });
        console.log("all users ==>", res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            // here email should be @unique in mode so that there is not error while using "where"
            where: {
                email: username, // Here, email is used to find the user
            },
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
    });
}
updateUser("admin1", {
    firstName: "new name",
    lastName: "singh"
});
