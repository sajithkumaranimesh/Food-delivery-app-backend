import Cart from "../models/cartModel";
import { CartDto } from "../dto/CartDto";

export const persist = async (cartDto: CartDto) => {
    try{
        const cart = new Cart(cartDto).save();
        return cart;
    }catch(err){
        return err;
    }
}

export const retrieve = async () => {
    try{
        const carts = await Cart.find();
        return carts;
    }catch(err){
        return err;
    }
}

export const retrieveById = async (id: string) => {
    try{
        const cart = await Cart.findById(id);
        return cart;
    }catch(err){
        return err;
    }
}

export const updateById = async (id: string, cartDto: CartDto) => {
    try{
        const cart = await Cart.findByIdAndUpdate(id, cartDto);
        return cart;
    }catch(err){
        return err;
    }
}

export const deleteById = async (id: string) => {
    try{
        const cart = await Cart.findByIdAndDelete(id);
        return cart;
    }catch(err){
        return err;
    }
}