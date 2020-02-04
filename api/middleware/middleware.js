const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

// authenticate middleware
function authenticate(req, res, next) {
	const token = req.get('Authorization');

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'you shall not pass' });
			} else {
				res.user = { email_address: decodedToken.email_address };
				next();
			}
		});
	} else {
		res.status(400).json({ message: 'no credentials provided' });
	}
}

// validation middleware

// Organizations
function validateOrg(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'org data is required' });
	} else if (!request.body.org_name) {
		response.status(400).json({ message: 'org name is required' });
	} else {
		next();
	}
}

function validateOrgUpdate(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'org data is required' });
	} else {
		next();
	}
}

function validatePumpUpdate(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'pump data is required' });
	} else {
		next();
	}
}

// Accounts
function validateAccount(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'account data is required' });
	} else if (!request.body.first_name) {
		response.status(400).json({ message: 'first name is required' });
	} else if (!request.body.last_name) {
		response.status(400).json({ message: 'last name is required' });
	} else if (!request.body.email_address) {
		response.status(400).json({ message: 'email address is required' });
	} else if (!request.body.password) {
		response.status(400).json({ message: 'password is required' });
	} else if (!request.body.role) {
		response.status(400).json({ message: 'Role is required' });
	}
	next();
}

function validateOperatorAccount(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'account data is required' });
	} else if (!request.body.first_name) {
		response.status(400).json({ message: 'first name is required' });
	} else if (!request.body.last_name) {
		response.status(400).json({ message: 'last name is required' });
	} else if (!request.body.email_address) {
		response.status(400).json({ message: 'email address is required' });
	} else if (!request.body.password) {
		response.status(400).json({ message: 'password is required' });
	} else if (!request.body.org_id) {
		response.status(400).json({ message: 'org_id is required' });
	}
	next();
}

function validateUpdate(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'please provide update data' });
	} else {
		next();
	}
}
// Pumps
function validatePump(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'pump data is required' });
	} else if (!request.body.latitude) {
		response.status(400).json({ message: 'latitude is required' });
	} else if (!request.body.longitude) {
		response.status(400).json({ message: 'longitude is required' });
	}
	next();
}

// Sensors
function validateSensor(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'sensor data is required' });
	}
	next();
}

// History
function validateHistory(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'history data is required' });
	}
	next();
}

// Sms notifications
function validateSms(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response.status(400).json({ message: 'sms data is required' });
	}
	next();
}

function validateLogin(request, response, next) {
	if (Object.keys(request.body).length === 0) {
		response
			.status(400)
			.json({ message: 'email/username and password is required' });
	} else if (!request.body.email_address) {
		response.status(400).json({ message: 'email/username is required' });
	} else if (!request.body.password) {
		response.status(400).json({ message: 'password is required' });
	}
	next();
}

module.exports = {
	authenticate,
	validateOrg,
	validateAccount,
	validatePump,
	validateSensor,
	validateHistory,
	validateSms,
	validateUpdate,
	validateLogin,
	validateOrgUpdate,
	validatePumpUpdate,
	validateOperatorAccount
};
