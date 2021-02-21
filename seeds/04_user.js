const users = require('../constants/data/users');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('l_user')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('l_user').insert(users);
    });
};
