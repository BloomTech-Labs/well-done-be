exports.up = function(knex) {
  return knex.schema.createTable("accounts", column => {
    column.increments();
    column
      .integer("org_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.string("first_name").notNullable();
    column.string("last_name").notNullable();
    column
      .string("email_address")
      .notNullable()
      .unique();
    column.string("password").notNullable();
    column.string("mobile_number");
    column.boolean("super_user").notNullable();
    column.boolean("org_user").notNullable();
    column.boolean("org_admin").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};
