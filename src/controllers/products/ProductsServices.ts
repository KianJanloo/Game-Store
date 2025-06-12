import { Product } from "../../models";
import { IProduct } from "../../types/product/product-type";
import { AppError } from "../../utils/error/AppError";

export const getProducts = async () => {
    const products = await Product.find();
    return products;
}
export const getProductById = async (id: string) => {
    const product = await Product.findById(id);
    if(!product){
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
    const updatedProduct = await Product.findByIdAndUpdate(id, product);
    if(!updatedProduct){
        throw new AppError("Product not found", 404);
    }
    return {
        success: true,
        message: "Product updated successfully"
    }
}

export const deleteProduct = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct){
        throw new AppError("Product not found", 404);
    }
    return {
        success: true,
        message: "Product deleted successfully"
    }
}