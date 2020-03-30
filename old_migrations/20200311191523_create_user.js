exports.up = knex => {
  return knex.schema.createTable('user', table => {
    table.increments('id');
    table.string('userName', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('email', 255).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user');
};
