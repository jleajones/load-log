const positions = require('../data/postions');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('position')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('position').insert(positions);
    });
};
