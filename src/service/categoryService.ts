import mongoose from "mongoose";
import { CategoryDto } from "../dto/CategoryDto";
import Category from "../models/categoryModel";


export const persist = async (category:CategoryDto) => {
    try {
        const savedCategory = await new Category(category).save();
        return savedCategory;
    } catch (error) {
        return error;
    }
}

export const retrieve = async () => {
    try {
        const categoryList = await Category.find();
        return categoryList;
    } catch (error) {  
        return error;
    }
}

export const retrieveById = async (id: string) => {
    try {
        const category = await Category.findById(id);
        return category;
    } catch (error) {
        return error;
    }
}

export const deleteById = async (id: string) => {
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const deletedCategory = await Category.findByIdAndDelete(objectId);
        return deletedCategory;
    }
    catch (error) {
        return error;
    }
    
}


export const updateById = async (id: string, category: CategoryDto) => {
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, category);
        return updatedCategory;
    }catch(error){
        return error;
    }
}