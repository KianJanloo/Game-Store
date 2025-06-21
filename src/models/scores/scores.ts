import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Score = mongoose.model("Score", scoreSchema);
export default Score;