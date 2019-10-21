const knex = require("knex");
const config = require("../../knexfile");
// const db = knex(config.development);
const db = require("../../data/dbConfig.js");


// function find() {
//   return db("history");
// }
// TODO: Find all history
const find = () => {
  try {
    return db("history");
  } catch (err) {
    console.log(err.message);
  }
};

// TODO: Find history by ID
// function findById(id) {
//   return db("history")
//     .where({ id })
//     .first();
// }
const findById = id => {
  try {
    return db("history")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

// TODO: get history by sensor id

function getHistoryBySensorId(id) {
  try {
    return db("history as h")
    .join("sensors as s", "s.id", "h.sensor_id")
    .where({sensor_id: id})
  } catch (err) {
    res.status(400).json(err.message)
  }
}

// 

// TODO: Insert history
// function insert(history) {
//   return db("history").insert(history);
// }
const insert = async historical => {
  try {
    await db("history").insert(historical);
    console.log("History successfully created!");
  } catch (err) {
    console.log(err);
  }
};


// TODO: Update history

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

// TODO: Remove history

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


// const findByOrgId = id => {
//   try {
//     return db("history as h")
//       .join("sensors as s", "s.id", "h.sensor_id")
//       .join("pumps as p", "p.id", "s.pump_id")
//       .join("organziations as o", "o.id", "p.org_id")
//       .where({ org_id: id })
//       .first();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const findByPumpId = id => {
//   try {
//     return db("history as h")
//       .join("sensors as s", "s.id", "h.sensor_id")
//       .join("pumps as p", "p.id", "s.pump_id")
//       .join("organziations as o", "o.id", "p.org_id")
//       .where({ pump_id: id })
//       .first();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const findBySensorId = id => {
//   try {
//     return db("history as h")
//       .join("sensors as s", "s.id", "h.sensor_id")
//       .join("pumps as p", "p.id", "s.pump_id")
//       .join("organziations as o", "o.id", "p.org_id")
//       .where({ sensor_id: id })
//       .first();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const insert = history => {
//   try {
//     return db("history")
//       .insert(history)
//       .returning("id");
//   } catch (err) {
//     console.log(err.message);
//   }
// // };

// function update(changes, id) {
//   return db("history")
//     .where({ id: id })
//     .update(changes);
// }

// function remove(id) {
//   return db("history")
//     .where({ id: id })
//     .del();
// }



// using findSteps(id) helper for GET to /:id/steps in scheme router
// function findSteps(id) {
//   return db("schemes")
//     .join("steps", "steps.scheme_id", "=", "schemes.id")
//     .where({ scheme_id: id })
//     .select(
//       "steps.id",
//       "schemes.scheme_name",
//       "steps.step_number",
//       "steps.instructions"
//     )
//     .then(steps => {
//       return steps;
//     });
// }


module.exports = {
  find,
  findById,
  // findByOrgId,
  // findByPumpId,
  // findBySensorId,
  insert,
  update,
  remove,
  getHistoryBySensorId
};
