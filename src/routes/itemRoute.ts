import express from "express";
import { persist, retrieve, retrieveById, updateById, deleteById} from "../controllers/itemController";

const itemRoute = express.Router();

itemRoute.post('/persist', persist);
itemRoute.get('/retrieve', retrieve);
itemRoute.get('/retrieve/:id', retrieveById);
itemRoute.put('/update/:id', updateById);
itemRoute.delete('/delete/:id', deleteById);

export default itemRoute;