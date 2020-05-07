
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'wilcoxva', password: "password123"},
        {id: 2, username: 'patrickdmorgan', password: "password123"},
      ]);
    });
};


