require('dotenv').config();

module.exports = {
  poweredByHeader: false,
  HERE_API_KEY: process.env.HERE_API_KEY,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
};
