import { User } from "../../models"
import { AppError } from "../../utils/error/AppError";

export const getUsers = async () => {
    const users = await User.find();
    return users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
    }));
}

export const getUsersById = async (id: string) => {
    const user = await User.findById(id);
    if(!user){
        throw new AppError("User not found", 404);
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
    };
}

export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new AppError("User not found", 404);
    }
    return {
        success: true,
        message: "User deleted successfully"
    };
}