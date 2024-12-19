import express from 'express';
import { persist, retrieve, retrieveById, updateById, deleteById } from '../controllers/cartItemController';

const cartItemRouter = express.Router();

cartItemRouter.post('/persist', persist);
cartItemRouter.get('/retrieve', retrieve);
cartItemRouter.get('/retrieve/:id', retrieveById);
cartItemRouter.put('/update/:id', updateById);  
cartItemRouter.delete('/delete/:id', deleteById);



export default cartItemRouter;