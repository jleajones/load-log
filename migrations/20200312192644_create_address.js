exports.up = knex => {
  return knex.schema.createTable('address', table => {
    table.increments('id');
    table.string('label',255);
    table.string('country',255);
    table.string('state',255);
    table.string('county',255);
    table.string('city',255);
    table.string('street',255);
    table.string('house_number', 255);
    table.string('postal_code', 255);
    table.string('district', 255);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('address');
};
