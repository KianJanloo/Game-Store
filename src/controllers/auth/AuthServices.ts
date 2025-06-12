import { User } from "../../models"
import { IUser } from "../../types/user/user-type"
import { AppError } from "../../utils/error/AppError";
import { generateAccessToken, generateToken } from "../../utils/token/tokenService";


export const register = async (data: IUser) => {
    const user = await User.findOne({ email: data.email });
    if(user){
        throw new AppError("User already exists", 400);
    }
    const newUser = await User.create(data);
    return {
        success: true,
        message: "User created successfully"
    }
}

export const login = async (data: IUser) => {
    const user = await User.findOne({ email: data.email });
    if(!user){
        throw new AppError("User not found", 404);
    }
    const { accessToken, refreshToken } = generateToken(user as IUser);
    return {
        accessToken,
        refreshToken
    }
}

export const refresh = async (data: { refreshToken: string }) => {
    const accessToken = generateAccessToken(data.refreshToken);
    if(!accessToken){
        throw new AppError("Invalid refresh token", 401);
    }
    return {
        accessToken
    }
}