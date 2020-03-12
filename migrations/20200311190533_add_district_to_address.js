exports.up = knex => {
  return knex.schema.table('address', table => {
    table.string('district', 255);
  });
};

exports.down = knex => {
  return knex.schema.table('address', table => {
    table.dropColumn('district');
  });
};
