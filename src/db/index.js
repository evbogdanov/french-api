import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

// Read DB URL from .env
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

// Create a new database instance
const db = pgPromise()(dbUrl);

// Export the database object for shared use
export default db;
