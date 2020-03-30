exports.up = knex => {
  return knex.schema.table('load', table => {
    table.dropColumn('start_location');
    table.dropColumn('stops');
  });
};

exports.down = knex => {
  return knex.schema.table('load', table => {
    table.jsonb('start_location');
    table.jsonb('stops');
  });
};
