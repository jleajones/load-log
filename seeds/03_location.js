const locations = require('../constants/data/locations');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('location')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('location').insert(locations);
    });
};
