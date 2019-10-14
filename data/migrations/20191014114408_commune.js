exports.up = function(knex) {
  return knex.schema.createTable("commune", column => {
    column.increments();
    column.string("commune_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("commune");
};
