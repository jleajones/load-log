exports.up = knex => {
  return knex.schema.table('l_user', table => {
    table.renameColumn('userName', 'user_name').unique();
    table.unique(['email']);
  });
};

exports.down = knex => {
  return knex.schema.table('load', table => {
    table.dropColumn('start_location');
    table.dropColumn('stops');
  });
};
