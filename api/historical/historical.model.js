const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

function find() {
    return db("historical")
}

const findById = id => {
    try {
      return db("historical")
        .where({ id })
        .first();
    } catch (err) {
      console.log(err.message);
    }
  };
  

const insert = history =>
db("historical")
.insert(history).returning('id');

function update(changes, story_id) {
    return db("historical")
      .where({ id: story_id })
      .update(changes);
  }
  
  const remove = historical_id =>
    db("historical")
      .where({ id: historical_id })
      .del();


module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
  };