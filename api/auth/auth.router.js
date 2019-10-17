const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth.model.js");
const secrets = require("../../config/secrets");
const Accounts = require("../accounts/accounts.model");
const restricted = require("../authentication-middleware");

// register account
// router.post('/', async (req, res) => {
//     try {
//         let account = req.body;
//         const hash = bcrypt.hashSync(account.password, 8);
//         account.password = hash;
//         const accountCreated = await Accounts.insert(account);
//         res.status(201).json(accountCreated);
//     } catch (err) {
//         console.log(err);
//     }
// });

router.post("/register", (req, res) => {
  let account = req.body;
  const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
  account.password = hash;

  Auth.add(account)
    .then(saved => {
      const token = restricted.generateToken(account);

      res.status(201).json(token);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// log in account
router.post("/login", (req, res) => {
  let { email_address, password } = req.body;

  Auth.findBy({ email_address })
    .first()
    .then(account => {
      if (account && bcrypt.compareSync(password, account.password)) {
        const token = restricted.generateToken(account);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
