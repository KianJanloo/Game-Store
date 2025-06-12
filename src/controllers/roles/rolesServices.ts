import { User } from "../../models"
import { AppError } from "../../utils/error/AppError";

export const changeRole = async (data: { userId: string, role: string }) => {
    const user = await User.findById(data.userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const updatedUser = await User.findByIdAndUpdate(user.id, { role: data.role });
    return {
        success: true,
        message: "Role changed successfully"
    }
}