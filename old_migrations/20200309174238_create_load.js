exports.up = knex => {
  return knex.schema.createTable('load', table => {
    table.increments();
    table.text('address');
    table.jsonb('start_location');
    table.jsonb('stops');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('load');
};
