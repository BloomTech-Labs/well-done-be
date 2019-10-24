const { check, validationResult } = require("express-validator");
const express = require("express");
const server = express();
// Extra validation, not completed, just trying out a new method for doing it.
server.use(express.json());
server.post(
  "/api/accounts",
  [
    check("email_address").isEmail(),
    check("super_user").isBoolean(),
    check("mobile_number").isMobilePhone(),
    check("email_address").custom(email => {
      if (alreadyHaveEmail(email)) {
        return Promise.reject("Email already registered");
      }
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email_address;
    const super_user= req.body.super_user;
    const mobile_number = req.body.mobile_number;
  }
);

// module.exports = {
//   };
