require('dotenv').config();

module.exports = {
  poweredByHeader: false,
  env: {
    HERE_API_KEY: process.env.HERE_API_KEY,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    GRAPHQL_API_URI: process.env.GRAPHQL_API_URI
  }
};
