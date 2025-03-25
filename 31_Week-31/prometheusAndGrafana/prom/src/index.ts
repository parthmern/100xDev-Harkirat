import express from "express";
import client from "prom-client";


const app = express();

import { NextFunction, Request, Response } from "express";
import { metricsMiddleware } from "./metrics/requestCount";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms for route ${JSON.stringify(req.route.path)} - ${JSON.stringify(req.method)} `);
}

app.use(express.json());
// app.use(middleware); // put it after other middleware
//app.use(cleanupMiddleware);
app.use(metricsMiddleware);

app.get("/user", (req, res) => {
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

app.get("/users", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));  // artificial delay
    res.send({
        name: "artificial Doe",
        age: 25,
    });
});



app.get("/metrics", async (req,res)=>{
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.send(metrics);
})

app.listen(3000);

