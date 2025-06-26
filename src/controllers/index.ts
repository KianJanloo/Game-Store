import productsController from "./products/ProductsController";
import authController from "./auth/AuthController"; 
import usersController from "./users/usersController";
import authMiddleware from "../middlewares/auth/authMiddleware";
import rolesController from "./roles/rolesControllers";
import categoriesController from "./categories/categoriesControllers";
import dashboardController from "./dashboard/dashboardControllers";
import paymentsController from "./payments/paymentsControllers";
import scoresControllers from './scores/scoresController'
import favoritesControllers from './favorites/favoritesControllers'
import cartControllers from './cart/cartControllers'
import ordersControllers from './orders/ordersControllers'
import commentsControllers from './comments/commentsControllers'

export { commentsControllers, ordersControllers, cartControllers, favoritesControllers, scoresControllers, productsController, authController, usersController, authMiddleware, rolesController, categoriesController, dashboardController, paymentsController };