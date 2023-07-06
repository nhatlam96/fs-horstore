"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
// Create a PostgreSQL pool for database connection
const pool = new pg_1.Pool({
    user: 'postgres',
    port: 5433,
});
exports.pool = pool;
