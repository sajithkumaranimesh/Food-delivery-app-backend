import { Schema, model } from "mongoose";
import { CartDto } from "../dto/CartDto";

const CartSchema = new Schema<CartDto>({
    subtotal: {
        type: Number,
        required: [true, "Please provide subtotal!"]
    },
    diliveryFee: {
        type: Number,
        required: [true, "Please provide delivery fee!"]
    },
    total: {
        type: Number,
        required: [true, "Please provide total!"]
    },
    status: {
        type: Boolean,
        required: [true, "Please provide status!"]
    }
});

const Cart = model<CartDto>('Cart', CartSchema);
export default Cart;