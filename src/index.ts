import path from 'path';
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Express running port :${PORT}`);
})