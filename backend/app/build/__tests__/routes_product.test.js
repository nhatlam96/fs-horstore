"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../models/postgres");
const product_1 = require("../controllers/product");
jest.mock('../models/postgres', () => {
    const mockQuery = jest.fn();
    const mockRelease = jest.fn();
    class MockPoolClient {
        query = mockQuery;
        release = mockRelease;
    }
    return {
        pool: {
            connect: jest.fn().mockResolvedValue(new MockPoolClient()),
        },
    };
});
describe('getMainCategoriesGateway Test Suite', () => {
    let mockRequest;
    let mockResponse;
    let originalConsoleLog;
    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = jest.fn();
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    afterEach(() => {
        console.log = originalConsoleLog;
        jest.clearAllMocks();
    });
    it('should return main categories', async () => {
        const mainCategories = ['Damen', 'Herren', 'Kinder', 'Pferde'];
        postgres_1.pool.connect.mockResolvedValueOnce({
            query: jest.fn().mockResolvedValueOnce({ rows: mainCategories.map(category => ({ category_type: category })) }),
            release: jest.fn(),
        });
        await (0, product_1.getMainCategoriesGateway)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mainCategories);
    });
});
