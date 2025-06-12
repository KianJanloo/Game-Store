import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./utils/logs/logger";
import errorMiddleware from "./middlewares/error/errorMiddleware";
import { authController, productsController, usersController } from "./controllers";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productsController);
app.use("/auth", authController);
app.use("/users", usersController);

app.use(errorMiddleware);

const PORT = 3000;

mongoose.connect("mongodb+srv://admin:1388ki8831@express.nlqmdqy.mongodb.net/").then(() => {
    app.listen(PORT, () => {
        logger.info("Serve is on")
    });
});