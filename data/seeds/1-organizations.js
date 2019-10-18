
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('organizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('organizations').insert([
        {org_name: 'Life Water', headquarter_city: 'New York'},
        {org_name: 'Water International', headquarter_city: 'Seattle'},
        {org_name: 'Wells for Life', headquarter_city: 'Paris'},
      ]);
    });
};
