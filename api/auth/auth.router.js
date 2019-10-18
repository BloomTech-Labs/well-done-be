const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth.model.js");
const secrets = require("../../config/secrets");
const { authenticate } = require("../middleware/middleware");
const { generateToken } = require("../auth/auth.helpers.js");

// * log in account - DONE
router.post("/login", async (req, res) => {
  try {
    let { email_address, password } = req.body;
    const account = await Auth.findBy({ email_address }).first();
    if (account && bcrypt.compareSync(password, account.password)) {
      const token = generateToken(account);
      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// TODO: logout
router.post("/logout", authenticate, (req, res) => {});

module.exports = router;
