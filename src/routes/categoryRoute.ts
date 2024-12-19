import express from "express";
import { persist, retrieve, retrieveById, deleteById, updateById } from "../controllers/categoryController";

const categoryRoute = express.Router();

categoryRoute.post('/persist', persist);
categoryRoute.get('/retrieve', retrieve);
categoryRoute.get('/retrieve/:id', retrieveById);
categoryRoute.delete('/delete/:id', deleteById);
categoryRoute.put('/update/:id', updateById);

export default categoryRoute