import knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export const db = knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION_STRING
});
