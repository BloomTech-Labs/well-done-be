const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// get all accounts
const getAccounts = () => {
  try {
    return db("accounts");
  } catch (err) {
    console.log(err.message);
  }
};

// get account by id
const getAccountById = id => {
  try {
    return db("accounts")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

// create account
const insert = async account => {
    const {first_name, last_name, email_address, password, mobile_number} = account;
    try {
        if (!first_name || !last_name || !email_address || !password || !mobile_number) {
            return null;
        } else {
            await db('accounts').insert(account);
        }
    } catch (err) {
        console.log(err);
    }
};

// update account
const update = async (id, changes) => {
    try {
        changes ? await db('schemes').where({id}).update(changes) : null;
    } catch (err) {
        console.log(err);
    }
}

// remove account
const removeAccount = async id => {
  try {
    const account = getAccountById(id);
    account
      ? await db("accounts")
          .where({ id })
          .del()
      : null;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  insert,
  update,
  removeAccount
};
