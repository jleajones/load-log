const loads = require('../constants/data/loads');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('load')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('load').insert(loads);
    });
};
