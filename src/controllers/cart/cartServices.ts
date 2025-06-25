import mongoose from "mongoose";
import { AppError } from "../../utils/error/AppError";
import { Cart, Product, User } from "../../models"

export const getCart = async (userId: string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User is undefined.", 404)
    }

    const cart = await Cart.findOne({ userId })
        .populate("products");

    const totalPrice = cart?.products.reduce((sum: number, product: any) => {
        return sum + (product.price || 0);
    }, 0);

    const totalCount = cart?.products.length;

    return {
        totalPrice: totalPrice,
        totalCount: totalCount,
        products: cart?.products.map(cart => (cart)) || [],
    }
}

export const addToCart = async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
        throw new AppError("User is undefined.", 404);
    }

    if (!product) {
        throw new AppError("Product is undefined.", 404);
    }

    let cart = await Cart.findOne({ userId });

    const productObjectId = new mongoose.Types.ObjectId(productId);

    if (!cart) {
        cart = await Cart.create({
            userId,
            products: [productObjectId]
        });
    } else {
        if (!cart.products.some(p => p.equals(productObjectId))) {
            cart.products.push(productObjectId);
            await cart.save();
        }
    }

    return {
        success: true,
        message: "Product successfully added to your cart."
    };
};

export const deleteProductFromCart = async (userId: string, productId: string) => {
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User is undefined.", 404);
    }

    if(!product){
        throw new AppError("Product is undefined", 404);
    };

    const productObjectId = new mongoose.Types.ObjectId(productId);

    await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: productObjectId } },
        { new: true }
    );

    return {
        success: true,
        message: "Product successfully deleted from your cart."
    }
}

export const clearCart = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User is undefined.", 404);
    }

    await Cart.findOneAndUpdate({ userId }, { products: [] });
    return {
        success: true,
        message: "Cart successfully cleared."
    }
}