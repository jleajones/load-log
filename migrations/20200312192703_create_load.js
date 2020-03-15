exports.up = knex => {
  return knex.schema.createTable('load', table => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.integer('start_location').notNullable();
    table.string('stops').notNullable();
    // TODO: add in future migration
    // table.timestamp('pickup_date');
    // table.timestamp('dropoff_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user');
};
