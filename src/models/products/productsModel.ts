import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    photos: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true,
        enum: ['Headset', 'Keyboard', 'Mouse', 'Mousepad', 'Monitor', 'Console', 'Controller', 'Chair', 'Microphone', 'Webcam', 'Accessories', "PC", "Laptop"]
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    specifications: {
        color: String,
        weight: String,
        dimensions: String,
        material: String,
        connectivity: [String],
        compatibility: [String],
        warranty: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: Number,
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;