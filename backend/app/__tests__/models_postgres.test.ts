import { Pool } from 'pg';
import { pool } from '../models/postgres';

describe('PostgreSQL Pool Test', () => {
    afterAll(() => pool.end());

    it('should create a PostgreSQL pool', () => {
        expect(pool).toBeInstanceOf(Pool);
    });

    it('should establish a database connection', async () => {
        const { rowCount } = await pool.query('SELECT * FROM product LIMIT 10');
        expect(rowCount).toBe(10);
    });
});