import { IPaymentCreateData, IPaymentUpdateData } from "payments/payments-type";
import { Payment, Product, User } from "../../models";
import { AppError } from "../.././utils/error/AppError";

export const getPayments = async () => {
    const payments = await Payment.find();
    return payments;
}

export const getPaymentsByUserId = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const payments = await Payment.find({ userId });
    return payments
}

export const getPaymentById = async (paymentId: string) => {
    const payment = await Payment.findById(paymentId);
    if(!payment){
        throw new AppError("Payment not found", 404)
    }
    return payment
}

export const createPayment = async (productId: string, userId: string, data: IPaymentCreateData) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found", 404);
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new AppError("Product not found", 404);
    }

    const payment = await Payment.create({
        productId,
        userId,
        amount: data.amount,
        createdAt: new Date(),
        status: "pending"
    })

    return({
        success: true,
        message: "Payment successfully added and posted."
    })
}

export const updatePayment = async (paymentId: string, data: IPaymentUpdateData) => {
    const payment = await Payment.findById(paymentId);
    if(!payment){
        throw new AppError("Payment not found", 404);
    };
    
    const editPayment = await Payment.findByIdAndUpdate(paymentId, {...data, updatedAt: new Date()});
    return {
        success: true,
        message: " Payment successfully updated. "
    }
}

export const continuePayment = async (paymentId: string) => {
    const payment = await Payment.findById(paymentId);
    if(!payment){
        throw new AppError("Payment not found", 404);
    };

    const continuePayment = await Payment.findByIdAndUpdate(paymentId, { status: "confirmed" });
    return {
        success: true,
        message: "Payment successfully updated status to confirmed"
    };
}

export const cancelPayment = async (paymentId: string) => {
    const payment = await Payment.findById(paymentId);
    if(!payment){
        throw new AppError("Payment not found", 404);
    };

    const cancelPayment = await Payment.findByIdAndUpdate(paymentId, { status: "canceled" });
    return {
        success: true,
        message: "Payment successfully updated status to canceled"
    };
}

export const deletePaymentById = async (paymentId: string) => {
    const payment = await Payment.findById(paymentId);
    if(!payment){
        throw new AppError("Payment not found", 404);
    }
    if(payment.status === "confirmed") {
        throw new AppError("Status of this payment is confirmed and you can't delete that.", 400);
    }
    await Payment.findByIdAndDelete(paymentId);
    return {
        success: true,
        message: "Payment successfully deleted."
    }
}