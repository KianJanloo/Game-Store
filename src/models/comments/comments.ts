import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    productId: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

commentSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastComment = await Comment.findOne().sort({ id: -1 });
        this.id = lastComment ? lastComment.id + 1 : 1;
    }
    next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;