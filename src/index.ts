import path from 'path';
import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const app = express();

const DB = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/default-db';

mongoose.connect(DB).then((con) => {
    console.log("DB connection successfuly!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Express running port :${PORT}`);
})