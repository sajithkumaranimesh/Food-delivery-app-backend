import { NextFunction, Request, Response } from "express";
import User from "../models/userModel"
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";


const signToken = (id:unknown) => {
    const secret_key = process.env.JWT_SERET || "secret_key"
    return jwt.sign({ id }, secret_key, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const signup = async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    try {
        const newUser: IUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })
        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token: token
        });

    } catch (err) {
        return next(err);
    }
    next();
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return next(console.log("Please provide email and password!"))
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(console.log("Incorrect email or password"))
        }

        const token = signToken(user._id);

        res.status(201).json({
            status: "success",
            token: token
        });
    }catch(err){
        next(err);
    }
    next();
}