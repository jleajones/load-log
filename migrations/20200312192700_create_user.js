exports.up = knex => {
  return knex.schema.createTable('l_user', table => {
    table.increments('id');
    table.string('email', 255).notNullable().unique();
    // TODO: does not need to be unique
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user');
};
