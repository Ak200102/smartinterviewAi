import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createOrder, verifyPayment } from "../controllers/payment.cotroller.js";



const paymentRouter = express.Router()
paymentRouter.post("/order" , isAuth , createOrder)
paymentRouter.post("/verify" , isAuth , verifyPayment)

export default paymentRouter;