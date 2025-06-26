import { ICreateComment, IEditComment } from "comments/comments-types";
import { AppError } from "../.././utils/error/AppError";
import { Comment, Product, User } from "../../models"
import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";

export const createComment = async (authorId: string, productId: string, data: ICreateComment) => {
    const user = await User.findById(authorId);
    const product = await Product.findById(productId);

    if (!user) {
        throw new AppError("User is undefined.", 404);
    };
    if (!product) {
        throw new AppError("Product is undefined.", 404);
    };

    const comment = await Comment.create({
        authorId,
        productId,
        ...data
    });

    return {
        success: true,
        message: "Your comment has sended."
    }
}

export const editComment = async (commentId: number, data: IEditComment) => {

    const comment = await Comment.findOne({ id: commentId });
    if (!comment) {
        throw new AppError("Comment is undefined.", 404);
    };

    await Comment.findOneAndUpdate({ id: commentId }, { ...data, updatedAt: new Date() });

    return {
        success: true,
        message: "Comment updated and submitted."
    }
}

export const deleteCommentById = async (commentId: number) => {

    const comment = await Comment.findOneAndDelete({ id: commentId });
    if (!comment) {
        throw new AppError("Comment is undefined.", 404);
    };

    return {
        success: true,
        message: "Comment successfully deleted."
    }
}

export const getAllComments = async (query: any) => {

    const { skip, limit, filter } = buildQueryOptions(query, ["title", "message"]);

    const comments = await Comment.find(filter)
        .skip(skip)
        .limit(limit);

    const total = await Comment.countDocuments(filter);

    return {
        comments: comments.map(comment => ({
            id: comment.id,
            productId: comment.productId,
            authorId: comment.authorId,
            title: comment.title,
            message: comment.message,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        })),
        total
    }
}

export const getCommentById = async (commentId: number) => {
    const comment = await Comment.findOne({ id: commentId });

    const user = await User.findById(comment?.authorId);

    return {
        id: comment?.id,
        productId: comment?.productId,
        authorId: comment?.authorId,
        authorFullname: `${user?.firstName} ${user?.lastName}`,
        authorPicture: user?.profilePicture,
        title: comment?.title,
        message: comment?.message,
        createdAt: comment?.createdAt,
        updatedAt: comment?.updatedAt,
    }

}