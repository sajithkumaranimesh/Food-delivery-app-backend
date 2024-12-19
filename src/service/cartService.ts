import { CartItemDto } from "../dto/CartItemDto";
import CartItem from "../models/cartModel";

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