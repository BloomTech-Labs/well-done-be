const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { authenticate } = require('../middleware/middleware');
const { generateToken } = require('../auth/auth.helpers');
const { validateOperatorAccount } = require('../middleware/middleware');
const Operators = require('./operators.model');

router.get('/', authenticate, (req, res) => {
	Operators.getAll()
		.then(operator => {
			res.status(200).json(operator);
		})
		.catch(err => res.status(500).json(err.message));
});

router.post('/', validateOperatorAccount, async (req, res) => {
	try {
		const account = req.body;
		const { email_address, first_name, last_name, mobile_number } = req.body;
		const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
		account.password = hash;
		const isUniqueEmail = await Operators.findBy({ email_address });
		const isUniqueMobile = await Operators.findBy({ mobile_number });
		if (isUniqueEmail === 0 || isUniqueMobile === 0) {
			await Operators.insert(account);
			const token = generateToken(account);
			res.status(200).json({
				token,
				first_name,
				last_name,
				mobile_number,
				email_address
			});
		} else {
			res.status(404).json({
				message:
					'Email address or mobile number is already taken, please enter a unique email or mobile number'
			});
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json(err.message, 'Error creating account');
	}
});

module.exports = router;
