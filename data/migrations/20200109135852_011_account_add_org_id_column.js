
exports.up = function(knex) {
    return  knex.schema.table('accounts', async (tbl) => {
        await tbl.integer("org_id").unsigned()
        .references("id")
        .inTable("organizations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    }
    )
};

exports.down = function(knex) {
  return knex.schema.table('accounts', async tbl => {
      await tbl.dropColumn('org_id')
  })
};
