const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

const findAll = () => {
  return db("history");
};

function findById(id) {
  return db("history")
    .where({ id })
    .first();
}

// ! findByOrgId will not work unil migrations are updated
const findByOrgId = id => {
  try {
    return db("history as h")
      .join("sensors as s", "s.id", "h.sensor_id")
      .join("pumps as p", "p.id", "s.pump_id")
      .join("organziations as o", "o.id", "p.org_id")
      .where({ org_id: id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

const findByPumpId = id => {
  try {
    return db("history as h")
      .join("sensors as s", "s.id", "h.sensor_id")
      .join("pumps as p", "p.id", "s.pump_id")
      .join("organziations as o", "o.id", "p.org_id")
      .where({ pump_id: id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

const findBySensorId = id => {
  try {
    return db("history as h")
      .join("sensors as s", "s.id", "h.sensor_id")
      .join("pumps as p", "p.id", "s.pump_id")
      .join("organziations as o", "o.id", "p.org_id")
      .where({ sensor_id: id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

const insert = history => {
  try {
    return db("history")
      .insert(history)
      .returning("id");
  } catch (err) {
    console.log(err.message);
  }
};

const update = (changes, id) => {
  try {
    return db("history")
      .where({ id })
      .update(changes);
  } catch (err) {
    console.log(err.message);
  }
};

const remove = id => {
  try {
    db("history")
      .where({ id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  findAll,
  findById,
  findByOrgId,
  findByPumpId,
  findBySensorId,
  insert,
  update,
  remove
};
