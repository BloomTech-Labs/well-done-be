const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Accounts = require("./accounts.model.js");
const { authenticate } = require("../middleware/middleware");
const { generateToken } = require("../auth/auth.helpers");
const { validateAccount, validateUpdate } = require("../middleware/middleware");

// GET to /api/accounts
// ! supposed to be only for superusers
router.get("/", authenticate, async (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// GET to /api/accounts/1
router.get("/:account_id", authenticate, (req, res) => {
  const { account_id } = req.params;
  Accounts.findById(account_id)
    .then(acc => {
      console.log("acc", acc);
      if (acc) {
        res.status(200).json(acc);
      } else {
        res.status(404).json({ message: "Could not find acc with given id." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// POST to /api/accounts
// ! supposed to be only for superusers (for now)
router.post("/", validateAccount, async (req, res) => {
  try {
    const account = req.body;
    console.log("account", account);
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

// PUT to /api/accounts/3
router.put("/:account_id", authenticate, validateUpdate, async (req, res) => {
  try {
    const { account_id } = req.params;
    const changes = req.body;
    await Accounts.update(account_id, changes);
    res.status(200).json({ message: "Account edited successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// DELETE to /api/accounts/4
router.delete("/:account_id", authenticate, async (req, res) => {
  try {
    const { account_id } = req.params;
    const removedAccount = await Accounts.remove(account_id);
    res.status(200).json({ message: "Account deleted!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
