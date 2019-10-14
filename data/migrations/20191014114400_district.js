exports.up = function(knex) {
  return knex.schema.createTable("district", column => {
    column.increments();
    column.string("district_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("district");
};
