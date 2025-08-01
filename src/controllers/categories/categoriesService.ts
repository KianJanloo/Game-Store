import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";
import { Categories } from "../../models"
import Category from "../../models/categories/categories";
import { ICategories } from "../../types/categories/categories-type";
import { AppError } from "../../utils/error/AppError";

export const getCategories = async (query: any) => {
    const { skip, limit, filter } = buildQueryOptions(query)

    const categories = await Categories.find(filter)
        .skip(skip)
        .limit(limit)

    const total = await Categories.countDocuments(filter)

    return {
        categories: categories.map((category) => ({
            id: category.id,
            title: category.title
        })),
        total: total
    };
}

export const getCategoryById = async (id: string) => {
    const category = await Categories.findById(id) as ICategories;
    return {
        id: category.id,
        title: category.title
    };
}

export const createCategory = async (data: ICategories) => {
    const category = await Categories.findOne({ title: data.title });
    if (category) {
        throw new AppError("Category already exists", 400);
    }
    const newCategory = await Categories.create(data);
    return {
        id: newCategory.id,
        title: newCategory.title
    };
}

export const deleteCategory = async (id: string) => {
    const category = await Category.deleteOne({ id: id });
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    return {
        success: true,
        message: "Category deleted successfully"
    }
}