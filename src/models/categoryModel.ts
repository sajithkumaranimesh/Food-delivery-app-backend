import { Schema, model } from "mongoose";
import { CategoryDto } from "../dto/CategoryDto";

const CategorySchema = new Schema<CategoryDto>({
    name:{
        type: String,
        required: [true, "Please provide category name!"]
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required: [true, "Please select the status!"]
    },
    imagUrl: {
        type: String
    }
});

const Category = model<CategoryDto>('Category', CategorySchema);

export default Category;


