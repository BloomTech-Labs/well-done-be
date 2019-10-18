const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

// authenticate middleware
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "you shall not pass" });
      } else {
        res.user = { email_address: decodedToken.email_address };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no credentials provided" });
  }
}

// TODO: superuser middleware

// TODO: orgAdmin middlware

module.exports = {
  authenticate
};
