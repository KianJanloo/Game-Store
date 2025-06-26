import { buildQueryOptions } from "../.././utils/helper/buildQueryOptions";
import { Product } from "../../models";
import { IProduct } from "../../types/product/product-type";
import { AppError } from "../../utils/error/AppError";

export const getProducts = async (
    query: any
) => {
    const { filter, limit, skip, sort } = buildQueryOptions(query, ["title", "description"]);

    const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort);

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