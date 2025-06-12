import { IUser } from "../../types/user/user-type";
import jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";

const SECRET_ACCESS = "ACCESSTOKEN32938298372937863273";
const SECRET_REFRESH = "REFRESHTOKEN32938298372937";

export const generateToken = (user: IUser) => {
    const accessToken = jwt.sign(
        { 
            id: user.id,
            role: user.role 
        }, 
        SECRET_ACCESS, 
        { expiresIn: "1h" }
    );
    
    const refreshToken = jwt.sign(
        { 
            id: user.id,
            role: user.role 
        }, 
        SECRET_REFRESH, 
        { expiresIn: "7d" }
    );
    
    return { accessToken, refreshToken };
}

export const generateAccessToken = (refreshToken: string) => {
    try {
        const decoded = jwt.verify(refreshToken, SECRET_REFRESH) as { id: string, role: string };
        const accessToken = jwt.sign(
            { 
                id: decoded.id,
                role: decoded.role 
            }, 
            SECRET_ACCESS, 
            { expiresIn: "1h" }
        );
        return accessToken;
    } catch (error) {
        throw new AppError("Invalid refresh token", 401);
    }
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET_ACCESS);
        return decoded;
    } catch (error) {
        return null;
    }
}