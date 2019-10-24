const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

const find = () => {
  try {
    return db("history");
  } catch (err) {
    console.log(err.message);
  }
};

const findById = id => {
  try {
    return db("history")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

function getHistoryBySensorId(id) {
  try {
    return db("history as h")
      .join("sensors as s", "s.id", "h.sensor_id")
      .where({ sensor_id: id });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const insert = async historical => {
  try {
    await db("history").insert(historical);
    console.log("History successfully created!");
  } catch (err) {
    console.log(err);
  }
};

const update = async (changes, id) => {
  try {
    changes
      ? await db("history")
          .where({ id })
          .first()
          .update(changes)
      : null;
  } catch (err) {
    console.log(err);
  }
};

const remove = async id => {
  try {
    const historical = findById(id);
    if (historical) {
      const deleted = await db("history")
        .where({ id })
        .del();
      return deleted;
    } else {
      console.log(
        "There was an error finding an history with the provided id."
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  getHistoryBySensorId
};
