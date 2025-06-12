export interface IProduct {
    title: string;
    description: string;
    price: number;
    photos: string[];
    category: 'Headset' | 'Keyboard' | 'Mouse' | 'Mousepad' | 'Monitor' | 'Console' | 'Controller' | 'Chair' | 'Microphone' | 'Webcam' | 'Accessories';
    brand: string;
    model: string;
    specifications: {
        color: string;
        weight: string;
        dimensions: string;
        material: string;
        connectivity: string[];
        compatibility: string[];
        warranty: string;
    };
    rating: number;
    reviews: {
        user: string;
        rating: number;
        comment: string;
        date: Date;
    }[];
    stock: number;
    discount: number;
    isActive: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateProduct extends Omit<IProduct, 'rating' | 'reviews' | 'createdAt' | 'updatedAt'> {
    rating?: number;
    reviews?: IProduct['reviews'];
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}