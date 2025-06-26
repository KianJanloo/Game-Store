import { Product } from "../../models";
import { IProduct } from "../../types/product/product-type";
import { AppError } from "../../utils/error/AppError";

import { ParsedQs } from 'qs';

export const getProducts = async (
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string | ParsedQs | string[] = 'asc'
) => {
    let filter: any = {};

    if (search) {
        filter.title = { $regex: search, $options: 'i' };
    }

    let orderStr: 'asc' | 'desc' = 'asc';
    if (typeof order === 'string' && (order === 'asc' || order === 'desc')) {
        orderStr = order;
    }

    const sortOrder = orderStr === 'asc' ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder;

    const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortObj);

    const total = await Product.countDocuments(filter);

    return {
        products,
        total,
    };
}


export const getProductById = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    return product;
}

export const createProduct = async (product: IProduct) => {
    const newProduct = await Product.create(product);
    return {
        success: true,
        message: "Product created successfully",
        product: newProduct
    }
}

export const updateProduct = async (product: IProduct, id: string) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, { product, updatedAt: new Date() });
    if (!updatedProduct) {
        throw new AppError("Product not found", 404);
    }
    return {
        success: true,
        message: "Product updated successfully"
    }
}

export const deleteProduct = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
        throw new AppError("Product not found", 404);
    }
    return {
        success: true,
        message: "Product deleted successfully"
    }
}