import express from "express";
import { persist, retrieve, retrieveById } from "../controllers/itemController";

const itemRoute = express.Router();

itemRoute.post('/persist', persist);
itemRoute.get('/retrieve', retrieve);
itemRoute.get('/retrieve/:id', retrieveById);

export default itemRoute;