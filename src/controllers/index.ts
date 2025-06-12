import productsController from "./products/ProductsController";
import authController from "./auth/AuthController"; 
import usersController from "./users/usersController";
import authMiddleware from "../middlewares/auth/authMiddleware";

export { productsController, authController, usersController, authMiddleware };