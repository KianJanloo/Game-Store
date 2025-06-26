import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "../utils/logs/logger";
import errorMiddleware from "../middlewares/error/errorMiddleware";
import { authController, cartControllers, categoriesController, commentsControllers, dashboardController, favoritesControllers, ordersControllers, paymentsController, productsController, rolesController, scoresControllers, usersController } from "../controllers";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productsController);
app.use("/auth", authController);
app.use("/users", usersController);
app.use("/roles", rolesController);
app.use("/categories", categoriesController);
app.use("/dashboard", dashboardController);
app.use("/payments", paymentsController);
app.use("/scores", scoresControllers);
app.use("/favorites", favoritesControllers);
app.use("/cart", cartControllers);
app.use("/orders", ordersControllers);
app.use("/comments", commentsControllers)

app.use(errorMiddleware);

const PORT = 3000;

app.get('/', (_req, res) => {
  res.send('API is running!');
});

mongoose.connect("mongodb+srv://admin:1388ki8831@express.nlqmdqy.mongodb.net/").then(() => {
    app.listen(PORT, () => {
        logger.info("Serve is on")
    });
});

export default app;