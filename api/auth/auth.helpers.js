const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const generateToken = user => {
	const payload = {
		id: user.id,
		email: user.email_address
	};
	const options = {
		expiresIn: '1d'
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = {
	generateToken
};
