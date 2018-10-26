import pgPromise from 'pg-promise';
import secrets from '../secrets';

// Create a new database instance
const db = pgPromise()(secrets.FR_DATABASE_URL);

// Export the database object for shared use
export default db;
