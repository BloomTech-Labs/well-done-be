
exports.up = function(knex) {
    return knex.schema.createTable("pad_seconds", column => {
        column.increments();
        column.integer("pad_seconds_0");
        column.integer("pad_seconds_1");
        column.integer("pad_seconds_2");
        column.integer("pad_seconds_3");

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
