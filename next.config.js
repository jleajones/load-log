require('dotenv').config();

module.exports = {
  poweredByHeader: false,
  env: {
    HERE_API_KEY: process.env.HERE_API_KEY,
    GRAPHQL_API_URI: process.env.GRAPHQL_API_URI,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
  }
};
