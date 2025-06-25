import { AppError } from "../.././utils/error/AppError";
import { Cart, Order, User } from "../../models"

export const addOrderOfUser = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User is undefined.", 404)
    }

    const cart = await Cart.findOne({ userId })
    .populate("products")

    if (!cart || cart.products.length === 0) {
        throw new AppError("Card is undefined or clear.", 404)
    }

    const totalPrice = cart?.products.reduce((sum: number, product: any) => {
        return sum + (product.price || 0);
    }, 0);

    await Order.create({
        userId,
        totalPrice,
        products: cart?.products.map(product => product)
    })

    await Cart.updateOne({ userId }, { products: [] });

    return {
        success: true,
        message: "Order submitted and added to order list."
    }
}

export const getOrders = async (page: number, limit: number) => {
    const orders = await Order.find()
        .populate("products")
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Order.countDocuments();
    return {
        orders: orders.map(order => ({
            id: order._id,
            userId: order.userId,
            totalProducts: order.products.length,
            totalPrice: order.totalPrice,
            status: order.status,
            date: order.date,
        })),
        total: total
    }
}

export const getOrderById = async (orderId: string) => {
    const order = await Order.findById(orderId)
        .populate("products")
    if (!order) {
        throw new AppError("Order is undefined.", 404);
    };

    return {
        id: order._id,
        userId: order.userId,
        products: order.products,
        totalPrice: order.totalPrice,
        status: order.status,
        date: order.date,
    }
}

export const editStatus = async (orderId: string, status: "pending" | "confirmed" | "canceled") => {
    const order = await Order.findByIdAndUpdate(orderId, { status });
    if (!order) {
        throw new AppError("Order is undefined.", 404);
    };

    return {
        success: true,
        message: "Status changed."
    }
}

export const deleteOrder = async (orderId: string) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
        throw new AppError("Order is undefined.", 404);
    };

    return {
        success: true,
        message: "Order successfully deleted."
    }
}