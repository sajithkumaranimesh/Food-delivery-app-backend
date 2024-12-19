import { Request, Response, NextFunction } from "express";
import { CartItemDto } from "../dto/CartItemDto";
import * as cartItemService from "../service/cartItemService";


export const persist = async (req: Request<{},{},CartItemDto>, res: Response, next: NextFunction) => {
    try{
        const newCartItem = {
            itemID: req.body.itemID,
            quantity: req.body.quantity,
            price: req.body.price,
            totalPrice: req.body.totalPrice,
            cartID: req.body.cartID
        }
        const savedCartItem = await cartItemService.persist(newCartItem);
        res.status(201).json({
            status: "success",
            savedCartItem
        });
    }catch(err){
        next(err);
    }
  
}

export const retrieve = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cartItems = await cartItemService.retrieve();
        res.status(200).json({
            status: "success",
            cartItems
        });
    }catch(err){
        next(err);
    }
}

export const retrieveById = async (req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const cartItem = await cartItemService.retrieveById(id);
        res.status(200).json({
            status: "success",
            cartItem
        });
    }catch(err){
        next(err);
    }
}


export const updateById = async (req: Request<{id: string},{},CartItemDto>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const updatedCartItem = {
            itemID: req.body.itemID,
            quantity: req.body.quantity,
            price: req.body.price,
            totalPrice: req.body.totalPrice,
            cartID: req.body.cartID
        }
        const cartItem = await cartItemService.updateById(id, updatedCartItem);
        res.status(200).json({
            status: "success",
            cartItem
        });
    }catch(err){
        next(err);
    }
}

export const deleteById = async (req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const cartItem = await cartItemService.deleteById(id);
        res.status(200).json({
            status: "success",
            cartItem
        });
    }catch(err){
        next(err);
    }
}