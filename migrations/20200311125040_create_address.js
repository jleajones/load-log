exports.up = knex => {
  return knex.schema.createTable('address', table => {
    table.increments('id');
    table.text('label');
    table.text('country');
    table.text('state');
    table.text('county');
    table.text('city');
    table.text('street');
    // TODO: rename to house_number
    table.text('houseNumber');
    // TODO: rename to postal_code
    table.text('postalCode');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('address');
};
