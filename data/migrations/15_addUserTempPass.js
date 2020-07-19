exports.up = function (knex) {
  return knex.schema.table("accounts", (table) => {
    table.boolean("temp_pass").defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.table("accounts", (table) => {
    table.dropColumn("temp_pass");
  });
};
