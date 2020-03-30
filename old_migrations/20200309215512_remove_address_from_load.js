exports.up = knex => {
  return knex.schema.table('load', table => {
    table.dropColumn('address')
  })
};

exports.down = knex => {
  return knex.schema.table('load', table => {
    table.text('address')
  })
};
