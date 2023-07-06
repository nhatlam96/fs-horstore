import { PoolClient } from './postgres';
import { ProductInterface } from './product.interface';
import { getImagePath } from '../helpers/getImagePath';
import { extractUniqueValues } from '../helpers/extractUniqueValues';
export { getMainCategoriesQuery, getProductsQuery, getProductsByIdQuery, getSuggestionsQuery, setFiltersQuery, updateByIdQuery };

async function getMainCategoriesQuery(client: PoolClient): Promise<string[]> {
    const query = `SELECT category_type FROM main_category ORDER BY id`;
    const { rows } = await client.query(query);
    const categories = rows.map(row => row.category_type);
    return categories;
}

async function getProductsQuery(client: PoolClient, jsonObject: ProductInterface): Promise<string[]> {
    const { category, sort, limit } = jsonObject;

    let query = `
        SELECT p.id, p.title, p.price, mc.category_type AS category, p.description, p.is_favorite AS "isFavorite", p.image
        FROM product p
        JOIN main_category mc ON mc.id = p.category_id`;

    const values: (string | number)[] = [];

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
        image: getImagePath(`${row.image}`),
    }));
}

async function getProductsByIdQuery(client: PoolClient, id: number): Promise<ProductInterface> {
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
        image: getImagePath(`${rows[0].image}`),
    };
}

async function getSuggestionsQuery(client: PoolClient): Promise<string[]> {
    const query = `
        SELECT ARRAY_REMOVE(ARRAY[category_type], NULL) AS result
        FROM main_category`;

    const { rows } = await client.query(query);

    if (rows.length === 0) {
        throw new Error('Suggestion not found');
    }

    return extractUniqueValues(rows);
}

async function setFiltersQuery(client: PoolClient, jsonObject: ProductInterface, minValue: number, maxValue: number, limit: number, isFavorite: string): Promise<ProductInterface[]> {
    const { sort } = jsonObject;
    const values: any[] = [minValue, maxValue, isFavorite];
    const conditions: string[] = [];

    let orderBy = '';
    if (sort !== undefined && sort === 'desc') {
        orderBy = 'ORDER BY t1.price DESC';
    } else {
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
        image: getImagePath(`${row.image}`),
    }));
}

async function updateByIdQuery(client: PoolClient, id: number, isFavorite: boolean): Promise<{ message: string, product?: ProductInterface }> {
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
            image: getImagePath(`${rows[0].image}`),
        };
        return { message: 'Product favorite status updated', product: updatedProduct };
    } else {
        throw new Error('Product not found');
    }
}