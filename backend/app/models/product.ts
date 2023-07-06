import { Request } from 'express';
import { ProductInterface } from './product.interface';

export async function readProductFromRequest(request: Request): Promise<ProductInterface> {
    const { params, body, query } = request;

    try {
        const id: number = parseInt(params.id as string, 10);
        const title: string = body.title as string;
        const price: number = parseFloat(body.price as string);
        const category: string = params.category as string;
        const description: string = body.description as string;
        const isFavorite: boolean = query.isFavorite === 'true';
        const image: string = body.image as string;
        const sort: string = query.sort as string;
        const limit: number = parseInt(query.limit as string, 10);

        const jsonObject: ProductInterface = {
            id,
            title,
            price,
            category,
            description,
            isFavorite,
            image,
            sort,
            limit,
        };

        return jsonObject;
    } catch (error) {
        throw new Error('Error parsing request data: ' + error);
    }
}