const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

const generateToken = user => {
  const payload = {
    subject: user.email_address
  };
  const options = {
    expiresIn: "2d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = {
  generateToken
};
