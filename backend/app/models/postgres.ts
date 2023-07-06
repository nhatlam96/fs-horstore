import { Pool, PoolClient } from 'pg';

export { pool, PoolClient };

// Create a PostgreSQL pool for database connection
const pool: Pool = new Pool({
    user: 'postgres',
    port: 5433,
});