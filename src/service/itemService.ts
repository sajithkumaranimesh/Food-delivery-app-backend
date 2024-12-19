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