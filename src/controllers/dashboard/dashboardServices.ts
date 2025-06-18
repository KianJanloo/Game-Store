import { User } from "../../models";
import { Product } from "../../models"

export const getSummary = async () => {
    const products = await Product.find();
    const users = await User.find();
    const admins = await User.find({ role: "admin" });
    const productsCount = products.length;
    const usersCount = users.length;
    const adminsCount = admins.length;

    return {
        productsCount,
        usersCount,
        adminsCount
    }
}
