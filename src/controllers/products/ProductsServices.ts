import { Product } from "../../models";
import { IProduct } from "../../types/product/product-type";
import { AppError } from "../../utils/error/AppError";

export const getProducts = async (page: number = 1, limit: number = 10) => {
    const products = await Product.find();
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = products.slice(startIndex, endIndex);
    return {
        products: paginatedProducts,
        total: products.length,
    };
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
    const updatedProduct = await Product.findByIdAndUpdate(id, {product, updatedAt: new Date()});
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