import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        default: 1
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

categorySchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastCategory = await Category.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastCategory ? lastCategory.id + 1 : 1;
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;