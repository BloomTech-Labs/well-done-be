const router = require("express").Router();

const Accounts = require("./accounts.model.js");

// TODO: get all accounts
router.get("/", async (req, res) => {
    try {
      const accounts = await Accounts.find();
      res.status(200).json(orgs);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

// TODO: get account by id
router.get("/:account_id", async (req, res) => {
    try {
      const accounts = await Accounts.findById();
      res.status(200).json(org);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

// TODO: create account
router.post("/", async (req, res) => {
    try {
      const { org } = req.body;
      const createdAccount = await Accounts.insert(org);
      res.status(200).json(createdAccount);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

// TODO: update account
router.put("/:account_id", (req, res) => {
    try {
        const {account_id} = req.params;
        const updateAccount = await Accounts.update(account_id);

    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });
  

// TODO: delete account
router.delete("/:account_id", (req, res) => {
    try {
      const {account_id} = req.params;
      const removedAccount = await Accounts.remove(org_id);
      res.status(200).json(removedAccount);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err.message);
    }
  });

  
  
  