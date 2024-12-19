import express from "express";
import userRouter from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";
import itemRoute from "./routes/itemRoute";

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categorys',categoryRoute )
app.use('/api/v1/items', itemRoute);

export default app;