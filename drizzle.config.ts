import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './socket/src/db/schema.ts',
  out: './socket/src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
