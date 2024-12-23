import { ItemDto } from "../dto/ItemDto";
import Item from "../models/itemModel";

export const persist = async (item:ItemDto) => {
    try {
        const savedItem = await new Item(item).save();
        return savedItem;
    } catch (error) {
        return error;
    }
}

export const retrieve = async () => {
    try {
        const itemList = await Item.find();
        return itemList;
    } catch (error) {  
        return error;
    }
}

export const retrieveById = async (id:string) => {
    try {
        const item = await Item.findById(id);
        return item;
    } catch (error) {
        return error;
    }
}

export const updateById = async (id:string, item:ItemDto) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, item);
        return updatedItem;
    } catch (error) {
        return error;
    }
}

export const deleteById = async (id:string) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        return deletedItem;
    } catch (error) {
        return error;
    }
}