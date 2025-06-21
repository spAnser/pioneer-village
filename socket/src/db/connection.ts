import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Create the drizzle database instance
export const db = drizzle(pool, { schema });

// Export the pool for direct access if needed
export { pool };
