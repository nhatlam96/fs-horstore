import { Request, Response } from 'express';
import { pool, PoolClient } from '../models/postgres';
import { getImagePath } from '../helpers/getImagePath';
import { readProductFromRequest } from '../models/product';
import { ProductInterface } from '../models/product.interface';
import { getMainCategoriesQuery, getProductsQuery, getProductsByIdQuery, getSuggestionsQuery, setFiltersQuery, updateByIdQuery } from '../models/product.queries';

export {
    getMainCategoriesGateway,
    getProductsGateway,
    getProductByIdGateway,
    getSuggestionsGateway,
    setFiltersGateway,
    updateByIdGateway,
    getMainCategories,
    getProductById
};

// gateway functions
async function getMainCategoriesGateway(req: Request, res: Response): Promise<void> {
    try {
        const mainCategories = await getMainCategories();
        res.status(200).json(mainCategories);
    } catch (error) {
        console.error('getMainCategoriesGateway: Error retrieving main categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getProductsGateway(req: Request, res: Response): Promise<void> {
    try {
        let jsonObject = await readProductFromRequest(req);
        const products = await getProducts(jsonObject);
        res.status(200).json(products);
    } catch (error) {
        console.error('getProductsGateway: Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getProductByIdGateway(req: Request, res: Response): Promise<void> {
    try {
        const product = await getProductById(parseInt(req.params.id, 10));
        res.status(200).json(product);
    } catch (error) {
        console.error('getProductByIdGateway:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getSuggestionsGateway(req: Request, res: Response): Promise<void> {
    try {
        const suggestions = await getSuggestions();
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('getSuggestionsGateway: Error retrieving suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function setFiltersGateway(req: Request, res: Response): Promise<void> {
    try {
        const jsonObject = await readProductFromRequest(req);
        const { minValue, maxValue, isFavorite } = req.query;
        const limit = parseInt(req.query.limit as string, 10);
        const filters = await setFilters(jsonObject, parseInt(minValue as string, 10), parseInt(maxValue as string, 10), limit, isFavorite as string);
        res.status(200).json(filters);
    } catch (error) {
        console.error('setFiltersGateway: Error retrieving filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateByIdGateway(req: Request, res: Response): Promise<void> {
    try {
        const jsonObject = await readProductFromRequest(req);
        const updatedProduct = await updateById(jsonObject.id as number, jsonObject.isFavorite as boolean);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('updateByIdGateway: Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// endpoint functions
async function getMainCategories(): Promise<string[]> {
    let client: PoolClient | undefined;

    try {
        console.log('getMainCategories: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await getMainCategoriesQuery(client);
    } catch (error) {
        console.error('getMainCategories: Error executing query:', error);
        throw new Error('Error retrieving main categories');
    } finally {
        if (client) {
            client.release();
            console.log('getMainCategories: DB CONNECTION CLOSED');
        }
    }
}

async function getProducts(jsonObject: ProductInterface): Promise<string[]> {
    const { category, sort, limit } = jsonObject;
    let client: PoolClient | undefined;

    try {
        console.log('getProducts: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await getProductsQuery(client, jsonObject);
    } catch (error) {
        console.error('getProducts: Error executing query:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
            console.log('getProducts: DB CONNECTION CLOSED');
        }
    }
}

async function getProductById(id: number): Promise<ProductInterface> {
    let client: PoolClient | undefined;

    try {
        console.log('getProductById: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await getProductsByIdQuery(client, id);
    } catch (error) {
        console.error('getProductById: Error executing query:', error);
        throw new Error('Error retrieving product');
    } finally {
        if (client) {
            client.release();
            console.log('getProductById: DB CONNECTION CLOSED');
        }
    }
}

async function getSuggestions(): Promise<string[]> {
    let client: PoolClient | undefined;

    try {
        console.log('getSuggestions: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await getSuggestionsQuery(client);
    } catch (error) {
        console.error('getSuggestions: Error executing query:', error);
        throw new Error('Error retrieving suggestions');
    } finally {
        if (client) {
            client.release();
            console.log('getSuggestions: DB CONNECTION CLOSED');
        }
    }
}

async function setFilters(jsonObject: ProductInterface, minValue: number, maxValue: number, limit: number, isFavorite: string): Promise<ProductInterface[]> {
    let client: PoolClient | undefined;

    try {
        console.log('setFilters: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await setFiltersQuery(client, jsonObject, minValue, maxValue, limit, isFavorite);
    } catch (error) {
        console.error('setFilters: Error executing query:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
            console.log('setFilters: DB CONNECTION CLOSED');
        }
    }
}

async function updateById(id: number, isFavorite: boolean): Promise<{ message: string, product?: ProductInterface }> {
    let client: PoolClient | undefined;

    try {
        console.log('updateById: ESTABLISHING DB CONNECTION...');
        client = await pool.connect();

        return await updateByIdQuery(client, id, isFavorite);
    } catch (error) {
        console.error('updateById: Error executing query:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
            console.log('updateById: DB CONNECTION CLOSED');
        }
    }
}