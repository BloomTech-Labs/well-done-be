const bcrypt = require("bcryptjs");

const router = require("express").Router();
const Accounts = require("./accounts.model.js");
// const { authenticate } = require("../middleware/middleware");
const { generateToken } = require("../auth/auth.helpers");

// * get all accounts - DONE
// ! supposed to be only for superusers
router.get("/", 
// authenticate, 
async (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * get account by id - DONE
router.get("/:account_id", 
// authenticate, 
async (req, res) => {
  try {
    const { account_id } = req.params;
    const account = await Accounts.findById(account_id);
    res.status(200).json(account);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * create account - DONE
// ! supposed to be only for superusers (for now)
router.post("/", async (req, res) => {
  try {
    const account = req.body;
    const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
    account.password = hash;
    await Accounts.insert(account);
    const token = generateToken(account);
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// update account - WORKING but doesnt return a message on Postman/Insomnia
router.put("/:account_id", 
// authenticate, 
async (req, res) => {
  try {
    const { account_id } = req.params;
    const changes = req.body;
    await Accounts.update(account_id, changes);
    res.status(200).json({message: "Account edited successfully."});
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: delete account
router.delete("/:account_id", 
// authenticate, 
async (req, res) => {
  try {
    const { account_id } = req.params;
    const removedAccount = await Accounts.remove(account_id);
    res.status(200).json({message: "Account deleted!"});
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
