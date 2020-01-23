const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const generateToken = user => {
	const payload = {
		subject: user.email_address
	};
	const options = {
		expiresIn: '2d'
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
};

const generateTokenForOperator = user => {
	const payload = {
		subject: user.id
	};
	const options = {
		expiresIn: '12h'
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = {
	generateToken,
	generateTokenForOperator
};
