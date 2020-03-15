exports.up = knex => {
  return knex.schema.table('load', table => {
    table.integer('user_id');
  });
};

exports.down = knex => {
  return knex.schema.table('load', table => {
    table.dropColumn('user_id');
  });
};
