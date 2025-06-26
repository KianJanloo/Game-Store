import { Favorite, Product, User } from "../../models";
import { AppError } from "../.././utils/error/AppError";
import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";

export const getFavoritesByUserId = async (userId: string, query: any) => {
    const { skip, limit } = buildQueryOptions(query);

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(" User is undefined. ", 404);
    };

    const favorites = await Favorite.find({ user: userId })
    .populate("product")
    .select("-user")
    .limit(limit)
    .skip(skip)

    const total = await Favorite.countDocuments({ user: userId })

    return {
        favorites: favorites.map(favorite => ({
            id: favorite.id,
            product: favorite.product
        })),
        total: total,
    };
}

export const createFavorite = async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(" User is undefined. ", 404);
    };

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError(" Product is undefined. ", 404);
    };

    const existingFavorite = await Favorite.findOne({ product: productId, user: userId });
    if (existingFavorite) {
        throw new AppError("This product already exist in favorites user list.", 409)
    }

    await Favorite.create({ user: userId, product: productId });
    return {
        success: true,
        message: " Favorite successfully added by productID. "
    };
}

export const deleteFavorite = async (favoriteId: string) => {
    const favorite = await Favorite.findByIdAndDelete(favoriteId);
    if (!favorite) {
        throw new AppError("Favorite is undefined.", 404);
    };
    return {
        success: true,
        message: " Favorite successfully added by productID. "
    };
}