exports.up = knex => {
  return knex.schema.createTable('position', table => {
    table.increments('id');
    table.float('longitude').notNullable();
    table.float('latitude').notNullable();
    table.string('type', 255).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('position');
};

