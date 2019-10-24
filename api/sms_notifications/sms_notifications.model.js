const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

//* [get] - get all sms notifications - test working
const get = async () => {
  try {
    return await db("sms_notifications");
  } catch (err) {
    console.log(err.message);
  }
};

//* [getById] - sms notifications by id - test worked
const getById = id => {
  try {
    return db("sms_notifications")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

//* [create] - create sms notifications - test worked
const create = async sms_notification => {
  try {
    await db("sms_notifications").insert(sms_notification);
    console.log("SMS notification successfully created!");
  } catch (err) {
    console.log(err);
  }
};

//* [update] - update sms notifications - test worked
const update = (changes, id) => {
    return db("sms_notifications")
      .where({ id })
      .update(changes);
};

//* [remove] - delete sms notifications - test worked
const remove = id => {
  return db("sms_notifications")
    .where({ id })
    .del();
} 


module.exports = {
  get,
  getById,
  create,
  update,
  remove
};
