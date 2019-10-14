exports.up = function(knex) {
  return knex.schema.createTable("dates", column => {
    column.increments();
    column.date("date").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("dates");
};
