
exports.up = function(knex) {
    return knex.schema.createTable("pad_counts", column => {
        column.increments();
        column.string("counts");
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
    return knex.schema.dropTableIfExists("pad_counts");

};
