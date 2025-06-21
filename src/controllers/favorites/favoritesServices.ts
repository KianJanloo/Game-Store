import { Favorite, Product, User } from "../../models";
import { AppError } from "../.././utils/error/AppError";

export const getFavoritesByUserId = async (userId: string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError(" User is undefined. ", 404);
    };

    const favorites = await Favorite.find({ userId });
    return favorites;
}

export const getFavoriteById = async (favoriteId: string) => {
    const favorite = await Favorite.findById({ favoriteId });
    if(!favorite){
        throw new AppError("Favorite is undefined.", 404);
    };
    return favorite;
}

export const createFavorite = async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError(" User is undefined. ", 404);
    };

    const product = await Product.findById(productId);
    if(!product){
        throw new AppError(" Product is undefined. ", 404);
    };

    await Favorite.create({ userId, ...product });
    return {
        success: true,
        message: " Favorite successfully added by productID. "
    };
}

export const deleteFavorite = async (favoriteId: string) => {
    const favorite = await Favorite.findByIdAndDelete(favoriteId);
    if(!favorite){
        throw new AppError("Favorite is undefined.", 404);
    };
    return {
        success: true,
        message: " Favorite successfully added by productID. "
    };
}