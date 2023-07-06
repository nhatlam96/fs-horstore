import { readProductFromRequest } from '../models/product';
import { ProductInterface } from '../models/product.interface';

describe('readProductFromRequest', () => {
    const mockRequest: any = {
        params: { id: '123', category: 'electronics' },
        body: { title: 'Smartphone', price: '599.99', description: 'Lorem ipsum dolor sit amet.', image: 'smartphone.jpg' },
        query: { isFavorite: 'true', sort: 'price', limit: '10' },
    };

    it('should parse request data and return a ProductInterface object', async () => {
        const expectedProduct: ProductInterface = {
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

        expect(await readProductFromRequest(mockRequest)).toEqual(expectedProduct);
    });
});