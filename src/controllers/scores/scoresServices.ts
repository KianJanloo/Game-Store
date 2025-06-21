import { IEditScore } from "scores/scores-type";
import { AppError } from "../.././utils/error/AppError";
import { Score, User } from "../../models"

export const getScoresByUserId = async (userId: string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found.", 404);
    };
    
    const score = await Score.findOne({ userId: userId });
    return {
        id: score?.id,
        amount: score?.amount
    }
}

export const editScoreForUser = async (userId: string, data: IEditScore) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found.", 404);
    };

    const score = await Score.findOneAndUpdate({ userId: userId }, { amount: data.amount })
    return {
        success: true,
        message: "Score's amount successfully edited for user."
    }
}