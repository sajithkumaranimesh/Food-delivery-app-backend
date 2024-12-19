import express from "express";
import { persist, retrieve } from "../controllers/itemController";

const itemRoute = express.Router();

itemRoute.post('/persist', persist);
itemRoute.get('/retrieve', retrieve);

export default itemRoute;