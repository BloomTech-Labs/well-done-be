exports.up = function(knex) {
  return Promise.all([
    knex.schema.table("accounts", tbl => tbl.dropColumn("org_id")),
    knex.schema.table("accounts", tbl => {
      tbl
        .integer("org_id")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
  ]);
};

exports.down = async function(knex) {
  const tableExists = await knex.schema.hasTable("accounts");
  if (tableExists) {
    return Promise.all([
      knex.schema.table(
        "accounts",
        async tbl => await tbl.dropColumn("org_id")
      ),
      knex.schema.table("accounts", async tbl => {
        await tbl
          .integer("org_id")
          .unsigned()
          .references("id")
          .inTable("organizations")
          .onDelete("RESTRICT")
          .onUpdate("RESTRICT");
      })
    ]);
  }
};
