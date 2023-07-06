import { Request, Response } from 'express';
import { getProductByIdGateway, getProductById } from '../controllers/product';

jest.mock('../controllers/product', () => ({
    getProductByIdGateway: jest.requireActual('../controllers/product').getProductByIdGateway,
    getProductById: jest.fn(),
}));

describe('getProductByIdGateway Test Suite', () => {
    let mockRequest: jest.Mocked<Request>;
    let mockResponse: jest.Mocked<Response>;
    let originalConsoleLog: typeof console.log;

    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = jest.fn();

        mockRequest = {
            params: { id: '5' },
        } as unknown as jest.Mocked<Request>;

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as jest.Mocked<Response>;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        jest.clearAllMocks();
    });

    it('should return the product with the specified ID', async () => {
        const mockData = {
            id: 5 as number,
            title: 'Reithandschuhe PROFESSIONAL Nubuk Lederimitat schwarz/dunkelgrau',
            price: 11.95 as number,
            category: 'Damen',
            description: 'Kontraststoff: 60% Polyurethan, 25% Polyester, 15% Baumwolle',
            isFavorite: false as boolean,
            image: 'http://localhost:9000/image/74152-4.jpeg',
        };

        (getProductById as jest.Mock).mockResolvedValueOnce(mockData);

        await getProductByIdGateway(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
});