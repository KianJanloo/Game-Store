export interface IPayment {
    id: string,
    amount: number,
    status: "pending" | "canceled" | "confirmed",
    createdAt: Date,
    productId: string,
    userId: string
}

export interface IPaymentCreateData {
    amount: number, 
}