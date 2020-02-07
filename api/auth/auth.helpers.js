const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");
const Operators = require("../operators/operators.model");

const generateToken = async (user, isOperator) => {
  // if ur logging in thru the operators login
  if (isOperator) {
    const payload = {
      id: user.id,
      email: user.email_address
    };
    const options = {
      expiresIn: "1d"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
  }
  // if ur logging in thru the web app
  if (user["role"] === "operator") {
    const operator = await Operators.getOperatorByEmail(user.email_address);
    const payload = {
      id: operator.id,
      email: user.email_address,
      operator_id: operator.id
    };
    const options = {
      expiresIn: "1d"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
  } else {
    const payload = {
      id: user.id,
      email: user.email_address
    };
    const options = {
      expiresIn: "1d"
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
};
module.exports = {
  generateToken
};
