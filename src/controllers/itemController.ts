import{ NextFunction, Request, Response } from "express"
import { ItemDto } from "../dto/ItemDto"
import * as itemService from "../service/itemService"

export const persist = async (req:Request<{},{},ItemDto>, res:Response, next:NextFunction) => {
    try{
        const newItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            imgURL: req.body.imgURL,
            availabilityStatus: req.body.availabilityStatus,
            categoryID: req.body.categoryID
        }
        const savedItem = await itemService.persist(newItem);
        res.status(201).json({
            status: "success",
            savedItem
        })
    }catch(err){
        next(err);
    }
    next();
}