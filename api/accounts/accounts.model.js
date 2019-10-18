const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

//* get all accounts - DONE
const find = () => {
  try {
    return db("accounts");
  } catch (err) {
    console.log(err.message);
  }
};

//* get account by id
const findById = id => {
  try {
    return db("accounts")
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

//* remove account
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
