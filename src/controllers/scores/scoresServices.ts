import { IEditScore } from "scores/scores-type";
import { AppError } from "../.././utils/error/AppError";
import { Score, User } from "../../models"
import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";

export const getAllScoresOfUsers = async (query: any) => {

    const { skip, limit, filter } = buildQueryOptions(query);

    const scores = await Score.find(filter)
        .skip(skip)
        .limit(limit);

    const total = await Score.countDocuments(filter);
    return {
        scores: scores.map(score => ({
            userId: score.userId,
            amount: score.amount
        })),
        total: total
    }
}

export const getScoresByUserId = async (userId: string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found.", 404);
    };
    
    const score = await Score.findOne({ userId: userId });
    return {
        userId: userId,
        amount: score?.amount
    }
}

export const increaseScoreForUser = async (userId: string, data: IEditScore) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found.", 404);
    };

    let score = await Score.findOne({ userId: userId })
    if(!score){
        score = await Score.create({ userId, amount: 0 })
    }

    await Score.findOneAndUpdate({ userId: userId }, { amount: score.amount + data.amount })
    return {
        success: true,
        message: "Score's amount successfully increased for user."
    }
}

export const decreaseScoreByUser = async (userId: string, data: IEditScore) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found.", 404);
    };

    let score = await Score.findOne({ userId: userId })
    if(!score){
        score = await Score.create({ userId, amount: 0 })
    }

    await Score.findOneAndUpdate({ userId: userId }, { amount: score.amount - data.amount })
    return {
        success: true,
        message: "Score's amount successfully decreased for user."
    }
}

