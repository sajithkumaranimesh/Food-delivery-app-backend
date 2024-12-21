import express from "express";
import userRouter from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";
import itemRoute from "./routes/itemRoute";
import cartItemRouter from "./routes/cartItemRoute";
import cartRouter from "./routes/cartRoute";

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categorys',categoryRoute )
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/cartItems', cartItemRouter);
app.use('/api/v1/carts', cartRouter);

export default app;