"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const postgres_1 = require("../models/postgres");
describe('PostgreSQL Pool Test', () => {
    afterAll(() => postgres_1.pool.end());
    it('should create a PostgreSQL pool', () => {
        expect(postgres_1.pool).toBeInstanceOf(pg_1.Pool);
    });
    it('should establish a database connection', async () => {
        const { rowCount } = await postgres_1.pool.query('SELECT * FROM product LIMIT 10');
        expect(rowCount).toBe(10);
    });
});
