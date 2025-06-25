import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

cartSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastcart = await cart.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastcart ? lastcart.id + 1 : 1;
    }
    next();
});

const cart = mongoose.model("cart", cartSchema);

export default cart;