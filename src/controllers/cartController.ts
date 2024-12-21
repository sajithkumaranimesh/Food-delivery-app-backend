import { Request, Response, NextFunction } from "express";
import { CartDto } from "../dto/CartDto";
import * as cartService from "../service/cartService";

export const persist = async (req: Request<{},{},CartDto>, res: Response, next: NextFunction) => {
    try{
        const newCart = {
            subtotal: req.body.subtotal,
            diliveryFee: req.body.diliveryFee,
            total: req.body.total,
            status: req.body.status,
            createdAt: req.body.createdAt
        }
        const savedCart = await cartService.persist(newCart);
        res.status(201).json({
            status: "success",
            savedCart
        });
    }catch(err){
        next(err);
    }
  
}

export const retrieve = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const carts = await cartService.retrieve();
        res.status(200).json({
            status: "success",
            carts
        });
    }catch(err){
        next(err);
    }
}

export const retrieveById = async (req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const cart = await cartService.retrieveById(id);
        res.status(200).json({
            status: "success",
            cart
        });
    }catch(err){
        next(err);
    }
}

export const updateById = async (req: Request<{id: string},{},CartDto>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const updatedCart = {
            subtotal: req.body.subtotal,
            diliveryFee: req.body.diliveryFee,
            total: req.body.total,
            status: req.body.status,
            createdAt: req.body.createdAt
        }
        const cart = await cartService.updateById(id, updatedCart);
        res.status(200).json({
            status: "success",
            cart
        });
    }catch(err){
        next(err);
    }
}

export const deleteById = async (req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const cart = await cartService.deleteById(id);
        res.status(200).json({
            status: "success",
            cart
        });
    }catch(err){
        next(err);
    }
}