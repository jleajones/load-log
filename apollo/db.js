import knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true
  }
  // debug: true
});
