import { Schema, model } from "mongoose";
import { CartItemDto } from "../dto/CartItemDto";


const CartItemSchema = new Schema<CartItemDto>({
    itemID: {
        type: String,
        required: [true, "Please provide item ID!"]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide quantity!"]
    },
    price: {
        type: Number,
        required: [true, "Please provide price!"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Please provide total price!"]
    },
    cartID: {
        type: String,
        required: [true, "Please provide cart ID!"]
    }
});

const CartItem = model<CartItemDto>('CartItem', CartItemSchema);

export default CartItem;