// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../constants/tableNames');

function addDefaultColumns (table) {
  table.dateTime('deleted_at');
  table.timestamps(false, true);
}

/**
 *
 * @param {Knex} knex
 */
exports.up = async knex => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.dateTime('last_login');
    addDefaultColumns(table);
  })
};

/**
 *
 * @param {Knex} knex
 */
exports.down = async knex => {
  await knex.schema.dropTable(tableNames.user);
};
