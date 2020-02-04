const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('./auth.model.js');
const secrets = require('../../config/secrets');
const { generateToken } = require('../auth/auth.helpers.js');
const { validateLogin } = require('../middleware/middleware');

// POST to /api/auth/login
router.post('/login', validateLogin, async (req, res) => {
	try {
		let { email_address, password } = req.body;
		console.log(req.body);
		const account = await Auth.findBy({ email_address }).first();
		if (account && bcrypt.compareSync(password, account.password)) {
			const token = await generateToken(account);
			const id = account.id;
			const user = account.user
			const role = account.role
			const org_id = account.org_id
			res.status(200).json({ token, id, user, email_address, role, org_id });
		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error logging in' });
	}
});

router.get('/login', (req, res) => {
	res.status(200).json(`Welcome to the Jungle`);
});

module.exports = router;
