import jwt from 'jsonwebtoken';
import { User } from "../../models"
import { IUser } from "../../types/user/user-type"
import { AppError } from "../../utils/error/AppError";
import { generateAccessToken, generateToken, SECRET_ACCESS } from "../../utils/token/tokenService";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const register = async (data: IUser) => {
    const user = await User.findOne({ email: data.email });
    if (user) {
        throw new AppError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({ ...data, password: hashedPassword });
    return {
        success: true,
        message: "User created successfully"
    }
}

export const login = async (data: IUser) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401);
    }
    const { accessToken, refreshToken } = generateToken(user as IUser);
    return {
        accessToken,
        refreshToken
    }
}

export const refresh = async (data: { refreshToken: string }) => {
    const accessToken = generateAccessToken(data.refreshToken);
    if (!accessToken) {
        throw new AppError("Invalid refresh token", 401);
    }
    return {
        accessToken
    }
}

const MAIL_USER = "kian1slayer@gmail.com";
const MAIL_PASS = "uwab cnnr ycwr hdev ";

export const forgetPassword = async (data: { email: string, url: string }) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const token = jwt.sign({ id: user.id }, SECRET_ACCESS, { expiresIn: "1h" });

    const url = `${data.url}`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    })

    const mailOptions = {
        from: MAIL_USER,
        to: data.email,
        subject: "Forget Password",
        html: `
        <h1>Forget Password</h1>
        <p>Click the link to reset your password: <a href="${url}">${url}</a></p>
        <span>This link will expire in 1 hour</span>
        <span> Thank you for using our service</span>
        `
    }

    await transporter.sendMail(mailOptions);

    return {
        success: true,
        message: "Email sent successfully",
        token
    }
}

export const resetPassword = async (data: { token: string, newPassword: string, confirmPassword: string }) => {
    if (data.confirmPassword !== data.newPassword) {
        throw new AppError("Password and confirm password do not match", 400);
    }
    const decoded = jwt.verify(data.token, SECRET_ACCESS) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(user.id, { password: hashedPassword });

    return {
        success: true,
        message: "Password reset successfully"
    }
}