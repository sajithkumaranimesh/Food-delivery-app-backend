import express from "express";
import userRouter from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categorys',categoryRoute )

export default app;