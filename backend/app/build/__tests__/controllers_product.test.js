"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../controllers/product");
jest.mock('../controllers/product', () => ({
    getProductByIdGateway: jest.requireActual('../controllers/product').getProductByIdGateway,
    getProductById: jest.fn(),
}));
describe('getProductByIdGateway Test Suite', () => {
    let mockRequest;
    let mockResponse;
    let originalConsoleLog;
    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = jest.fn();
        mockRequest = {
            params: { id: '5' },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    afterEach(() => {
        console.log = originalConsoleLog;
        jest.clearAllMocks();
    });
    it('should return the product with the specified ID', async () => {
        const mockData = {
            id: 5,
            title: 'Reithandschuhe PROFESSIONAL Nubuk Lederimitat schwarz/dunkelgrau',
            price: 11.95,
            category: 'Damen',
            description: 'Kontraststoff: 60% Polyurethan, 25% Polyester, 15% Baumwolle',
            isFavorite: false,
            image: 'http://localhost:9000/image/74152-4.jpeg',
        };
        product_1.getProductById.mockResolvedValueOnce(mockData);
        await (0, product_1.getProductByIdGateway)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
});
