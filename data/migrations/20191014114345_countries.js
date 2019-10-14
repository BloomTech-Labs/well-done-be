exports.up = function(knex) {
  return knex.schema.createTable("countries", column => {
    column.increments();
    column.string("country_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("countries");
};
