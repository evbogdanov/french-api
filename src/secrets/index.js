import dotenv from 'dotenv';

// Read secrets from '.env' file and put them into 'process.env'
dotenv.config();

const secretNames = [
  'FR_SECRET',
  'FR_DATABASE_URL',
];

const secrets = {};

for (const name of secretNames) {
  secrets[name] = process.env[name];
}

export default secrets;
