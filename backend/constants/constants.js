require('dotenv').config();

const { PORT = 3000, JWT_SECRET = 'dev-key' } = process.env;

const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
