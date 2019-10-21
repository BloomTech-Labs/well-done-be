const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

//* get all sms notifications - test working
const get = () => {
  try {
    return db("sms_notifications");
  } catch (err) {
    console.log(err.message);
  }
};

//* get sms notification by id - test working
const getById = id => {
  try {
    return db("sms_notifications")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

//* create sms notification - test working
const create = async sms_notification => {
  try {
    await db("sms_notifications").create(sms_notification);
    console.log("SMS notification successfully created!");
  } catch (err) {
    console.log(err);
  }
};

//* update sms notification - test working
const update = (changes, id) => {
    return db("sms_notifications")
      .where({ id })
      .update(changes);
};

//* remove sms notification - test working
const remove = async id => {
  try {
    const sms_notification = findById(id);
    if (sms_notification) {
      await db("sms_notifications")
        .where({ id })
        .del();
    } else {
      console.log(
        "There was an error finding an sms notifications with the provided id."
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove
};
