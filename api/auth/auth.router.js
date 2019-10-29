const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth.model.js");
const secrets = require("../../config/secrets");
const { generateToken } = require("../auth/auth.helpers.js");

// POST to /api/auth/login
router.post("/login", async (req, res) => {
  try {
    let { email_address, password } = req.body;
    const account = await Auth.findBy({ email_address }).first();
    if (account && bcrypt.compareSync(password, account.password)) {
      const token = generateToken(account);
      const id = account.id;
      res.status(200).json({ token, id });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

module.exports = router;
