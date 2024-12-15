import { Request } from "express";
import User from "../models/userModel"
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";

export const signup = async (req:Request<{},{}, IUser>, res, next) => {
    const newUser:IUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const secret_key = process.env.JWT_SERET || "secret_key"

    const token = jwt.sign({ id: newUser._id }, secret_key  ,{
        expiresIn: process.env.JWT_EXPIRES_IN
    } )

    res.status(201).json({
        status: "success",
        token: token
    });
}