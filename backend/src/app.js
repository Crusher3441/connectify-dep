import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import {connectToSocket} from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"

import dotenv from "dotenv";
dotenv.config();


const app = express();
const server = createServer(app); 
connectToSocket(server);

app.set("port" , (process.env.PORT || 8000));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use( "/api/v1/users" , userRoutes );

app.get("/" , (req,res)=>{
    return res.json({"message" : "Hello World"});
})

const connectionString = process.env.MONGO_URI;
const start = async ()=>{
    try{
        const connectionDB = await mongoose.connect(connectionString);
        console.log(`MongoDB connection to DB host: ${connectionDB.connection.host}`);
    }
    catch(e){
        console.log("Error while connecting to DB : " , e.status);
    }
    

    server.listen(app.get("port"), ()=>{
        console.log(`app is listening on PORT : ${app.get("port")}`);
    });


}

start();
