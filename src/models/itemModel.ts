import { Schema, model } from "mongoose";
import { ItemDto } from "../dto/ItemDto";

const ItemSchema = new Schema<ItemDto>({
    name:{
        type: String,
        required: [true, "Please provide item name!"]
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Please provide item price!"]
    },
    stockQuantity: {
        type: Number,
        required: [true, "Please provide item stock quantity!"]
    },
    imgURL: {
        type: String
    },
    availabilityStatus: {
        type: Boolean,
        required: [true, "Please select the availability status!"]
    },
    categoryID: {
        type: String,
        required: [true, "Please provide category ID!"]
    }
})

const Item = model<ItemDto>('Item', ItemSchema);

export default Item;