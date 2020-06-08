exports.up = function (knex) {
  return knex.schema.table("sensors", (table) => {
    table.string("cord_email");
  });
};

exports.down = function (knex) {
  return knex.schema.table("sensors", (table) => {
    table.dropColumn("cord_email");
  });
};
