const addresses = require('../data/addresses');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('address')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('address').insert(addresses);
    });
};
