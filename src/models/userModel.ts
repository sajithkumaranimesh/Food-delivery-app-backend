import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser extends Document {
    name: string,
    email: string,
    password: string
    passwordConfirm?: string,
    createdAt?: Date,
}

const UserSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please provide your name !"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a valid email !"]
    },
    password: {
        type: String,
        required: [true, "Please provide password !"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password !"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (user.password !== user.passwordConfirm) {
        return next(new Error("Password do not match !"))
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.passwordConfirm = undefined;
        next();
    } catch (err) {
        next();
    }

})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;