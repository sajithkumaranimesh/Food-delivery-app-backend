import mongoose, { Schema, Document, Query } from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    createPasswordResetToken();
    changedPasswordAfter(JWTTimestamp: number)
    name: string,
    email: string,
    password: string
    passwordConfirm?: string,
    createdAt?: Date,
    passwordResetToken?: string,
    passwordResetExpires?: Date,
    passwordChangedAt?: Date
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
        type: Date,
    },
    passwordChangedAt: {
        type: Date,
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

UserSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew){
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
    if (this.passwordChangedAt instanceof Date) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};


UserSchema.pre(/^find/, function (this: Query<any, any>, next) {
    this.find({ active: { $ne: false } });
    next();
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