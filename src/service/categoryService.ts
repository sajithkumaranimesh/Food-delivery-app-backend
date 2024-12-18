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
    const categoryId = new mongoose.Types.ObjectId(id);
    const deletedCategory = await Category.findOneAndDelete(categoryId);
    return deletedCategory;
}


export const update = async (category: CategoryDto) => {
    const updatedCategory = await Category.findByIdAndUpdate(category);
    return updatedCategory;
}