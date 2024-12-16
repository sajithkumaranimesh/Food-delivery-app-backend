import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    createPasswordResetToken();
    name: string,
    email: string,
    password: string
    passwordConfirm?: string,
    createdAt?: Date,
    passwordResetToken?: string,
    passwordResetExpires?: Date
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
        required: [true, "Please provide password !"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password !"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires:{

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

});


UserSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    if (typeof candidatePassword !== "string" || typeof userPassword !== "string") {
        throw new Error("Passwords must be strings");
    }
    return await bcrypt.compare(candidatePassword, userPassword)
}


UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log("Reset Token (Raw):", resetToken);
    console.log("Reset Token (Hashed):", this.passwordResetToken);
    return resetToken;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;