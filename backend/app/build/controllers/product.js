"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getMainCategories = exports.updateByIdGateway = exports.setFiltersGateway = exports.getSuggestionsGateway = exports.getProductByIdGateway = exports.getProductsGateway = exports.getMainCategoriesGateway = void 0;
const postgres_1 = require("../models/postgres");
const product_1 = require("../models/product");
const product_queries_1 = require("../models/product.queries");
// gateway functions
async function getMainCategoriesGateway(req, res) {
    try {
        const mainCategories = await getMainCategories();
        res.status(200).json(mainCategories);
    }
    catch (error) {
        console.error('getMainCategoriesGateway: Error retrieving main categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getMainCategoriesGateway = getMainCategoriesGateway;
async function getProductsGateway(req, res) {
    try {
        let jsonObject = await (0, product_1.readProductFromRequest)(req);
        const products = await getProducts(jsonObject);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('getProductsGateway: Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getProductsGateway = getProductsGateway;
async function getProductByIdGateway(req, res) {
    try {
        const product = await getProductById(parseInt(req.params.id, 10));
        res.status(200).json(product);
    }
    catch (error) {
        console.error('getProductByIdGateway:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getProductByIdGateway = getProductByIdGateway;
async function getSuggestionsGateway(req, res) {
    try {
        const suggestions = await getSuggestions();
        res.status(200).json(suggestions);
    }
    catch (error) {
        console.error('getSuggestionsGateway: Error retrieving suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getSuggestionsGateway = getSuggestionsGateway;
async function setFiltersGateway(req, res) {
    try {
        const jsonObject = await (0, product_1.readProductFromRequest)(req);
        const { minValue, maxValue, isFavorite } = req.query;
        const limit = parseInt(req.query.limit, 10);
        const filters = await setFilters(jsonObject, parseInt(minValue, 10), parseInt(maxValue, 10), limit, isFavorite);
        res.status(200).json(filters);
    }
    catch (error) {
        console.error('setFiltersGateway: Error retrieving filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.setFiltersGateway = setFiltersGateway;
async function updateByIdGateway(req, res) {
    try {
        const jsonObject = await (0, product_1.readProductFromRequest)(req);
        const updatedProduct = await updateById(jsonObject.id, jsonObject.isFavorite);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error('updateByIdGateway: Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.updateByIdGateway = updateByIdGateway;
// endpoint functions
async function getMainCategories() {
    let client;
    try {
        console.log('getMainCategories: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.getMainCategoriesQuery)(client);
    }
    catch (error) {
        console.error('getMainCategories: Error executing query:', error);
        throw new Error('Error retrieving main categories');
    }
    finally {
        if (client) {
            client.release();
            console.log('getMainCategories: DB CONNECTION CLOSED');
        }
    }
}
exports.getMainCategories = getMainCategories;
async function getProducts(jsonObject) {
    const { category, sort, limit } = jsonObject;
    let client;
    try {
        console.log('getProducts: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.getProductsQuery)(client, jsonObject);
    }
    catch (error) {
        console.error('getProducts: Error executing query:', error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
            console.log('getProducts: DB CONNECTION CLOSED');
        }
    }
}
async function getProductById(id) {
    let client;
    try {
        console.log('getProductById: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.getProductsByIdQuery)(client, id);
    }
    catch (error) {
        console.error('getProductById: Error executing query:', error);
        throw new Error('Error retrieving product');
    }
    finally {
        if (client) {
            client.release();
            console.log('getProductById: DB CONNECTION CLOSED');
        }
    }
}
exports.getProductById = getProductById;
async function getSuggestions() {
    let client;
    try {
        console.log('getSuggestions: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.getSuggestionsQuery)(client);
    }
    catch (error) {
        console.error('getSuggestions: Error executing query:', error);
        throw new Error('Error retrieving suggestions');
    }
    finally {
        if (client) {
            client.release();
            console.log('getSuggestions: DB CONNECTION CLOSED');
        }
    }
}
async function setFilters(jsonObject, minValue, maxValue, limit, isFavorite) {
    let client;
    try {
        console.log('setFilters: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.setFiltersQuery)(client, jsonObject, minValue, maxValue, limit, isFavorite);
    }
    catch (error) {
        console.error('setFilters: Error executing query:', error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
            console.log('setFilters: DB CONNECTION CLOSED');
        }
    }
}
async function updateById(id, isFavorite) {
    let client;
    try {
        console.log('updateById: ESTABLISHING DB CONNECTION...');
        client = await postgres_1.pool.connect();
        return await (0, product_queries_1.updateByIdQuery)(client, id, isFavorite);
    }
    catch (error) {
        console.error('updateById: Error executing query:', error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
            console.log('updateById: DB CONNECTION CLOSED');
        }
    }
}
