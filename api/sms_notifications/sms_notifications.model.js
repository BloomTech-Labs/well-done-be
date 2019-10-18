const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// TODO: get all sms notifications
const find = () => {
  try {
    return db("sms_notifications");
  } catch (err) {
    console.log(err.message);
  }
};

// TODO: get sms notification by id
const findById = id => {
  try {
    return db("sms_notifications")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

// TODO: create sms notification
const insert = async sms_notification => {
  try {
    await db("sms_notifications").insert(sms_notification);
    console.log("SMS notification successfully created!");
  } catch (err) {
    console.log(err);
  }
};

// TODO: update sms notification
const update = async (id, changes) => {
  try {
    changes
      ? await db("sms_notifications")
          .where({ id })
          .update(changes)
      : null;
  } catch (err) {
    console.log(err);
  }
};

// TODO: remove sms notification
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
  find,
  findById,
  insert,
  update,
  remove
};
