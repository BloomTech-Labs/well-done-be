
exports.up = function(knex) {
    return knex.schema.table("accounts", async (tbl) => {
        await tbl.dropColumn("org_id")
});
}

exports.down = function(knex) {
    return knex.schema.table("accounts", async (tbl) => {
        await tbl.integer("org_id")
    })
};
