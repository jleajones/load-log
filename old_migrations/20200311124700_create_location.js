exports.up = knex => {
  return knex.schema.createTable('location', table => {
    table.increments('id');
    table.text('label');
    table.integer('address_id');
    table.integer('display_position_id');
    table.integer('route_position_id');
    table.text('here_id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('location');
};
