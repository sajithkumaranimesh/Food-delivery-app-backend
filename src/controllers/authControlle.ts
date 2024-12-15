import { Request } from "express";
import User from "../models/userModel"
import { IUser } from "../models/userModel";

export const signup = async (req:Request<{},{}, IUser>, res, next) => {
    const newUser:IUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    res.status(201).json({
        status: "success",
        data: newUser
    });
}