exports.up = function(knex) {
  return knex.schema.createTable("province", column => {
    column.increments();
    column.string("province_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("province");
};
