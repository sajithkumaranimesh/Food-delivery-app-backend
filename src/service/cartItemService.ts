import { CartItemDto } from "../dto/CartItemDto";
import CartItem from "../models/cartItemModel";

export const persist = async (cartItemDto: CartItemDto) => {
    try{
        const cartItem = new CartItem(cartItemDto).save();
        return cartItem;
    }catch(err){
        return err;
    }
  
}

export const retrieve = async () => {
    try{
        const cartItems = await CartItem.find();
        return cartItems;
    }catch(err){
        return err;
    }
}

export const retrieveById = async (id: string) => {
    try{
        const cartItem = await CartItem.findById(id);
        return cartItem;
    }catch(err){
        return err;
    }
}

export const updateById = async (id: string, cartItemDto: CartItemDto) => {
    try{
        const cartItem = await CartItem.findByIdAndUpdate  (id, cartItemDto);
        return cartItem;
    }catch(err){
        return err;
    }
}

export const deleteById = async (id:string) => {
    try{
        const cartItem = await CartItem.findByIdAndDelete(id);
        return cartItem;
    }catch(err){
        return err;
    }
}