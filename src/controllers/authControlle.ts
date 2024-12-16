import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

const signToken = (id: unknown) => {
    const secret_key = process.env.JWT_SERET || "secret_key";
    return jwt.sign({ id }, secret_key, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const signup = catchAsync(
    async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
        const newUser: IUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token: token,
        });
    }
);

export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("Please provide email and password!", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError("Incorrect email or password", 401));
        }

        const token = signToken(user._id);

        res.status(201).json({
            status: "success",
            token: token,
        });
    }
);


export const forgotPassword = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new AppError("There is no user with that email.", 404))
    }

    const resetToken = user.createPasswordResetToken();
    
    await user.save({validateBeforeSave: true});

    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

});