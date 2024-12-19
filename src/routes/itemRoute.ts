import express from "express";
import { persist } from "../controllers/itemController";

const itemRoute = express.Router();

itemRoute.post('/persist', persist);

export default itemRoute;