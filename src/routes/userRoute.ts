import express from "express";
import {signup, login, forgotPassword, resetPassword} from "../controllers/authControlle";

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

export default userRouter;