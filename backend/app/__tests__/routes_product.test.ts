import { Request, Response } from 'express';
import { pool } from '../models/postgres';
import { getMainCategoriesGateway } from '../controllers/product';

jest.mock('../models/postgres', () => {
    const mockQuery = jest.fn();
    const mockRelease = jest.fn();

    class MockPoolClient {
        query = mockQuery;
        release = mockRelease;
    }

    return {
        pool: {
            connect: jest.fn().mockResolvedValue(new MockPoolClient() as any),
        },
    };
});

describe('getMainCategoriesGateway Test Suite', () => {
    let mockRequest: Request;
    let mockResponse: Response;
    let originalConsoleLog: typeof console.log;

    beforeEach(() => {
        originalConsoleLog = console.log;
        console.log = jest.fn();

        mockRequest = {} as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        jest.clearAllMocks();
    });

    it('should return main categories', async () => {
        const mainCategories = ['Damen', 'Herren', 'Kinder', 'Pferde'];

        (pool.connect as jest.Mock).mockResolvedValueOnce({
            query: jest.fn().mockResolvedValueOnce({ rows: mainCategories.map(category => ({ category_type: category })) }),
            release: jest.fn(),
        });

        await getMainCategoriesGateway(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mainCategories);
    });
});