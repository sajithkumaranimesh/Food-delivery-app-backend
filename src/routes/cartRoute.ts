import express from 'express';
import { persist, retrieve, retrieveById, updateById, deleteById } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post('/persist', persist);
cartRouter.get('/retrieve', retrieve);
cartRouter.get('/retrieve/:id', retrieveById);
cartRouter.put('/update/:id', updateById);
cartRouter.delete('/delete/:id', deleteById);

export default cartRouter;