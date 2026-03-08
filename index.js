import express from "express";
import connectDb from "./config/connectDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)
const port = process.env.PORT
app.listen(port,()=>{
    connectDb();
    console.log(`server started at ${port}`)
})