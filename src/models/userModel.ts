import mongoose, {Schema,Document} from "mongoose";
import validator from "validator";

interface IUser extends Document{
    name: string,
    email: string,
    password: string
    passwordConfirm?: string,
    createdAt?: Date,
}

const UserSchema:Schema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please provide your name !"]
    },
    email:{
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a valid email !"]
    },
    password: {
        type: String,
        required: [true, "Please provide password !"]
    },
    passwordConfirm:{
        type:String,
        required: [true, "Please confirm your password !"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', function(next){
    const user = this;

    if(user.password !== user.passwordConfirm){
        return next(new Error("Password do not match !"))
    }

    user.passwordConfirm = undefined;

    next();
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;