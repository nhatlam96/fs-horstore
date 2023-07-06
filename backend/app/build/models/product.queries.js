"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateByIdQuery = exports.setFiltersQuery = exports.getSuggestionsQuery = exports.getProductsByIdQuery = exports.getProductsQuery = exports.getMainCategoriesQuery = void 0;
const getImagePath_1 = require("../helpers/getImagePath");
const extractUniqueValues_1 = require("../helpers/extractUniqueValues");
async function getMainCategoriesQuery(client) {
    const query = `SELECT category_type FROM main_category ORDER BY id`;
    const { rows } = await client.query(query);
    const categories = rows.map(row => row.category_type);
    return categories;
}
exports.getMainCategoriesQuery = getMainCategoriesQuery;
async function getProductsQuery(client, jsonObject) {
    const { category, sort, limit } = jsonObject;
    let query = `
        SELECT p.id, p.title, p.price, mc.category_type AS category, p.description, p.is_favorite AS "isFavorite", p.image
        FROM product p
        JOIN main_category mc ON mc.id = p.category_id`;
    const values = [];
    if (category !== undefined) {
        query += ` WHERE mc.category_type LIKE $1`;
        values.push(`${category}%`);
    }
    if (sort !== undefined) {
        query += ` ORDER BY price ${sort === 'desc' ? 'DESC' : 'ASC'}`;
    }
    if (limit !== undefined) {
        const parsedLimit = parseInt(limit.toString(), 10);
        if (!isNaN(parsedLimit)) {
            query += ` LIMIT $${values.length + 1}`;
            values.push(parsedLimit);
        }
    }
    const { rows } = await client.query(query, values);
    return rows.map(row => ({
        ...row,
        image: (0, getImagePath_1.getImagePath)(`${row.image}`),
    }));
}
exports.getProductsQuery = getProductsQuery;
async function getProductsByIdQuery(client, id) {
    const query = `
        SELECT p.id, p.title, p.price, mc.category_type AS category, p.description, p.is_favorite AS "isFavorite", p.image
        FROM product p
        JOIN main_category mc ON mc.id = p.category_id
        WHERE p.id = $1`;
    const { rows } = await client.query(query, [id]);
    if (rows.length === 0) {
        throw new Error('Product not found');
    }
    return {
        ...rows[0],
        image: (0, getImagePath_1.getImagePath)(`${rows[0].image}`),
    };
}
exports.getProductsByIdQuery = getProductsByIdQuery;
async function getSuggestionsQuery(client) {
    const query = `
        SELECT ARRAY_REMOVE(ARRAY[category_type], NULL) AS result
        FROM main_category`;
    const { rows } = await client.query(query);
    if (rows.length === 0) {
        throw new Error('Suggestion not found');
    }
    return (0, extractUniqueValues_1.extractUniqueValues)(rows);
}
exports.getSuggestionsQuery = getSuggestionsQuery;
async function setFiltersQuery(client, jsonObject, minValue, maxValue, limit, isFavorite) {
    const { sort } = jsonObject;
    const values = [minValue, maxValue, isFavorite];
    const conditions = [];
    let orderBy = '';
    if (sort !== undefined && sort === 'desc') {
        orderBy = 'ORDER BY t1.price DESC';
    }
    else {
        orderBy = 'ORDER BY t1.price ASC';
    }
    if (!isNaN(limit)) {
        conditions.push(`LIMIT $${values.length + 1}`);
        values.push(limit);
    }
    const query = `
            SELECT t1.id, t1.title, t1.price, t2.category_type AS category, t1.description, t1.is_favorite AS "isFavorite", t1.image
            FROM product AS t1
            INNER JOIN main_category AS t2 ON t1.category_id = t2.id
            WHERE t1.price > $1 AND t1.price < $2 AND t1.is_favorite = $3
            ${orderBy}
            ${conditions.join(' ')}`;
    const result = await client.query(query, values);
    /* if (result.rows.length === 0) {
        throw new Error('Products not found');
    } */
    return result.rows.map(row => ({
        ...row,
        image: (0, getImagePath_1.getImagePath)(`${row.image}`),
    }));
}
exports.setFiltersQuery = setFiltersQuery;
async function updateByIdQuery(client, id, isFavorite) {
    const query = `
        UPDATE product
        SET is_favorite = $1
        WHERE id = $2
        RETURNING *`;
    const values = [isFavorite, id];
    const { rows } = await client.query(query, values);
    if (rows.length > 0) {
        const updatedProduct = {
            ...rows[0],
            image: (0, getImagePath_1.getImagePath)(`${rows[0].image}`),
        };
        return { message: 'Product favorite status updated', product: updatedProduct };
    }
    else {
        throw new Error('Product not found');
    }
}
exports.updateByIdQuery = updateByIdQuery;
