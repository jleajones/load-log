exports.up = knex => {
  return knex.schema.createTable('l_user', table => {
    table.increments('id');
    table.string('email', 255).notNullable().unique();
    // TODO: does not need to be unique
    table.string('password', 255).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user');
};
