const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

//* get all accounts
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
  const {
    first_name,
    last_name,
    email_address,
    password,
    org_user,
    super_user,
    org_admin
  } = account;
  try {
    if (
      !first_name ||
      !last_name ||
      !email_address ||
      !password ||
      !org_user ||
      !super_user ||
      !org_admin
    ) {
      console.log(
        "Missing information. Make sure you are providing all required fields before continuing."
      );
    } else {
      await db("accounts").insert(account);
      console.log("Account successfully created!");
    }
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
          .update(changes)
      : null;
  } catch (err) {
    console.log(err);
  }
};

//* remove account
const remove = async id => {
  try {
    const account = findById(id);
    if (account) {
      await db("accounts")
        .where({ id })
        .del();
    } else {
      console.log(
        "There was an error finding an account with the provided id."
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
