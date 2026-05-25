import express from "express";
import { login, register, verifyUser } from "../Controller/UserController.js";
import { verify } from "../Middleware/AuthMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/verify", verify,verifyUser);