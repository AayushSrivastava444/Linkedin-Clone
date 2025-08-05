import express from 'express'
import { getCurrentUser } from '../Controller/userController.js';
import isAuth from '../Middlewares/isAuth.js';

let userRouter=express.Router();

userRouter.get("/currentUser", isAuth, getCurrentUser)

export default userRouter