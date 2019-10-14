exports.up = function(knex) {
  return knex.schema.createTable("account_types", column => {
    column.increments();
    column.string("super_user");
    column.string("org_user");
    column.string("org_admin");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("account_types");
};
