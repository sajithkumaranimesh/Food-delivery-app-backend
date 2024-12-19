import mongoose from "mongoose";
import { CategoryDto } from "../dto/CategoryDto";
import Category from "../models/categoryModel";


export const persist = async (category:CategoryDto):Promise<CategoryDto> => {
    const savedCategory = await new Category(category).save();
    return savedCategory;
}

export const retrieve = async () => {
    const categoryList = await Category.find();
    return categoryList;
}

export const retrieveById = async (id: string) => {
    const catrgory = await Category.findOne({id});
    return catrgory;
}

export const deleteById = async (id: string) => {
    console.log(id);
    const objectId = new mongoose.Types.ObjectId(id);
    const deletedCategory = await Category.findByIdAndDelete(objectId);
    return deletedCategory;
}


export const update = async (id: string, category: CategoryDto) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, category);
    return updatedCategory;
}