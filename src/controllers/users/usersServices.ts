import { IEditUser } from "user/user-type";
import { User } from "../../models"
import { AppError } from "../../utils/error/AppError";
import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";

export const getUsers = async (query: any) => {

    const { filter, skip, limit } = buildQueryOptions(query, ["username"]);

    const users = await User.find(filter)
    .skip(skip)
    .limit(limit)

    const total = await User.countDocuments(filter);
    return {
        users: users.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
        })),
        total: users.length,
    };
}

export const getUsersById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return {
        success: true,
        message: "User deleted successfully"
    };
}

export const editProfile = async (id: string, data: IEditUser) => {
    const user = await User.findByIdAndUpdate(id, { ...data, updatedAt: new Date() })

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        success: true,
        message: "User's profile successfully updated and submit."
    }
}