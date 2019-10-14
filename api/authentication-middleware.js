const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = {
  authenticate,
  generateToken
};

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

function generateToken(user) {
  const payload = {
    subject: user.email_address
  };
  const options = {
    expiresIn: "2d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
