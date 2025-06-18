import productsController from "./products/ProductsController";
import authController from "./auth/AuthController"; 
import usersController from "./users/usersController";
import authMiddleware from "../middlewares/auth/authMiddleware";
import rolesController from "./roles/rolesControllers";
import categoriesController from "./categories/categoriesControllers";
import dashboardController from "./dashboard/dashboardControllers";
import paymentsController from "./payments/paymentsControllers";

export { productsController, authController, usersController, authMiddleware, rolesController, categoriesController, dashboardController, paymentsController };