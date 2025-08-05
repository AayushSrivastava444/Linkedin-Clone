import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/DB.js';
import authRouter from './Routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoutes.js';

dotenv.config();
let app=express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())

let port=process.env.PORT

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(port, ()=>{
    connectDB()
    console.log("Server is started");
})