const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth.model.js");
const secrets = require("../../config/secrets");
const { generateToken } = require("../auth/auth.helpers.js");
const { validateLogin } = require("../middleware/middleware")

// POST to /api/auth/login
router.post("/login", validateLogin, async (req, res) => {
  try {
    let { email_address, password } = req.body;
    console.log(req.body)
    const account = await Auth.findBy({ email_address }).first();
    if (account && bcrypt.compareSync(password, account.password)) {
      const token = generateToken(account);
      const id = account.id;
      let user = account.super_user
      if (account.super_user === 1){
        user = "super_user"
      } else if(account.org_user === 1){
        user = "org_user"
      } else if(account.org_adm === 1){
        user = "org_adm"
      }
      res.status(200).json({ token, id, user });
    } else {
      res.status(401).json({ message: "Invalid Credentials" })
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

router.get("/login", (req, res) => {
  res.status(200).json(`Welcome to the Jungle`);
});

module.exports = router;
