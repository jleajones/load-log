exports.up = knex => {
  return knex.schema.table('load', table => {
    table.integer('start_location');
    table.string('stops');
  });
};

exports.down = knex => {
  return knex.schema.table('load', table => {
    table.dropColumn('start_location');
    table.dropColumn('stops');
  });
};
