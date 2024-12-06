import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
