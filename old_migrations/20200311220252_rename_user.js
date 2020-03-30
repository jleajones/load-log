exports.up = knex => {
  return knex.schema.renameTable('user', 'l_user');
};

exports.down = knex => {
  return knex.schema.dropTable('l_user');
};
