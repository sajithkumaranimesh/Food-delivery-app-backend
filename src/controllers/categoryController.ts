import {Request, Response, NextFunction } from "express";
import { CategoryDto } from "../dto/CategoryDto";
import * as categoryService from "../service/categoryService";


export const persist = async (req:Request<{}, {}, CategoryDto>, res:Response, next:NextFunction) => {
    try{
        const newCategory = {
            name: req.body.name,
            description: req.body.description,
            isActive: req.body.isActive,
            imagUrl: req.body.imagUrl
        }
        const savedCategory = await categoryService.persist(newCategory);
        res.status(201).json({
            status: "success",
            savedCategory
        })
    }catch(err){
       next(err);
    }
    next();
};


export const retrieve = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const categoryList = await categoryService.retrieve();
        res.status(200).json({
            status: "success",
            categoryList
        })
    }catch(err){
        next(err);
    }
    next();
}


export const retrieveById = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        const category = await categoryService.retrieveById(id);
        res.status(200).json({
            status: "success",
            category
        })
    }catch(err){
        next(err);
    }
    next();
}


export const deleteById = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        console.log(id)
        const deletedCategory = await categoryService.deleteById(id);
        res.status(204).json({
            status: "success",
            deletedCategory
        })
    }catch(err){
        next(err);
    }
    next();
}

export const updateById = async (req:Request, res:Response, next:NextFunction) => {
    
    try{
        const {id} = req.params;
        const category = {
            name: req.body.name,
            description: req.body.description,
            isActive: req.body.isActive,
            imagUrl: req.body.imagUrl
        }
        const updatedCategory = await categoryService.updateById(id, category);
        res.sendStatus(200).json({
            status: "success",
            updatedCategory
        })
    }catch(err){
        next(err);
    }
    next();
}