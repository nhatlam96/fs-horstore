"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
describe('readProductFromRequest', () => {
    const mockRequest = {
        params: { id: '123', category: 'electronics' },
        body: { title: 'Smartphone', price: '599.99', description: 'Lorem ipsum dolor sit amet.', image: 'smartphone.jpg' },
        query: { isFavorite: 'true', sort: 'price', limit: '10' },
    };
    it('should parse request data and return a ProductInterface object', async () => {
        const expectedProduct = {
            id: 123,
            title: 'Smartphone',
            price: 599.99,
            category: 'electronics',
            description: 'Lorem ipsum dolor sit amet.',
            isFavorite: true,
            image: 'smartphone.jpg',
            sort: 'price',
            limit: 10,
        };
        expect(await (0, product_1.readProductFromRequest)(mockRequest)).toEqual(expectedProduct);
    });
});
