
exports.up = function(knex) {
    return knex.schema.createTable("pad_seconds", column => {
        column.increments();
        column.specificType("seconds", "integer ARRAY");
        column
          .integer("history_id")
          .unsigned()
          .references("id")
          .inTable("history")
          .onUpdate("RESTRICT")
          .onDelete("RESTRICT");
      });
    };
  

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pad_seconds");
};
