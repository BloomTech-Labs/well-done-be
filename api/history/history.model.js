const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

const find = () => {
  try {
    return db("history as h")
    // .join("pad_seconds as s", "s.history_id", "h.id")
    // .join("pad_counts as c", "c.history_id", "h.id")
  } catch (err) {
    console.log(err.message);
  }
};

const findById = id => {
  try {
    return db("history as h")
    // .join("pad_seconds as s", "s.history_id", "h.id")
    // .join("pad_counts as c", "c.history_id", "h.id")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};


// const findById = id => {
//   try {
//     return db("history as h")
//       .join("pad_counts as c", "c.history_id", "h.id")
//       .join("pad_seconds as s", "s.history_id", "h.id")
//       .where({ id })
//       .first();
//   } catch (err) {
//     console.log(err.message);
//   }
// };
const padCounts = (id) => {
  return db("pad_counts")
  .where({history_id: id})
}

const padSeconds = (id) => {
  return db("pad_seconds")
  .where({history_id: id})
}

function getHistoryById(id) {
  const historyQuery = findById(id);
  const getPadCounts = padCounts(id);
  const getPadSeconds = padSeconds(id);
  return Promise.all([historyQuery, getPadCounts, getPadSeconds]).then(
    ([history, counts, seconds]) => {
      history.pad_counts = counts;
      history.pad_seconds = seconds;
      return history;
    }
  );
}

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
  getHistoryBySensorId,
  getHistoryById
};
