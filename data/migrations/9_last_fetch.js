
exports.up = function(knex) {
    return knex.schema.createTable("last_fetch", column => {
        column.increments();
        column.integer("last");
        column.timestamp("created_at").defaultTo(knex.fn.now())
      });
    };
  

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("last_fetch");
};
