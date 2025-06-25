import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled"],
        default: "pending"
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    userId: {
        type: String,
        required: String
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const Order = mongoose.model("Order", orderSchema);

export default Order;