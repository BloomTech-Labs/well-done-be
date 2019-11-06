const knex = require("knex");
const config = require("../../knexfile");
// const db = knex(config.development);
const db = require("../../data/dbConfig.js");

//* get all accounts
const find = () => {
  try {
    return db("accounts")
    .select(["id", "first_name", "last_name", "email_address", "mobile_number", "super_user", "org_user", "org_admin"])
  } catch (err) {
    console.log(err.message);
  }
};

//* get account by id
const findById = id => {
  try {
    return db("accounts")
      .select(["id", "first_name", "last_name", "email_address", "mobile_number", "super_user", "org_user", "org_admin"])
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

//* create account
const insert = async account => {
  try {
    await db("accounts").insert(account);
  } catch (err) {
    console.log(err);
  }
};

//* update account
const update = async (id, changes) => {
  try {
    changes
      ? await db("accounts")
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
    await db("accounts")
      .where({ id })
      .first()
      .del();
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
