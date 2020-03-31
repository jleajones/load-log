import knex from 'knex';
import knexConfig from '../knexfile';

const environment = process.env.ENVIRONMENT || 'development';

// eslint-disable-next-line import/prefer-default-export
export const db = knex(knexConfig[environment]);
