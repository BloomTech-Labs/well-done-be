const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { authenticate } = require('../middleware/middleware');
const { generateToken } = require('../auth/auth.helpers');
const {
	validateOperatorAccount,
	validateLogin
} = require('../middleware/middleware');

const Operators = require('./operators.model');
const Sensors = require('../sensors/sensors.model');

//fetch all accounts in the operators table
router.get('/', authenticate, (req, res) => {
	Operators.getOperators()
		.then(operator => {
			res.status(200).json(operator);
		})
		.catch(err => res.status(500).json(err.message));
});

//fetch account by id in the operators table
router.get('/:id', authenticate, (req, res) => {
	Operators.getOperatorById(req.params.id)
		.then(operator => {
			if (operator.length === 0) {
				res.status(200).json({ message: 'Invalid ID' });
			} else {
				res.status(200).json(operator);
			}
		})
		.catch(err => res.status(500).json(err.message));
});

//fetch all operators and their assigned sensors
router.get('/assigned/sensor', authenticate, (req, res) => {
	Operators.getAssignedSensors()
		.then(assigned => {
			res.status(200).json(assigned);
		})
		.catch(err => res.status(500).json(err.message));
});

//fetch sensors by operator id
router.get('/assigned/operator/:id', authenticate, (req, res) => {
	Operators.getAssignedSensorsByOperatorId(req.params.id)
		.then(assigned => {
			console.log(assigned);
			if (assigned.length === 0) {
				res.status(200).json({ message: 'invalid operator id' });
			} else {
				res.status(200).json(assigned);
			}
		})
		.catch(err => res.status(500).json(err.message));
});

//create a new operator account
router.post('/', validateOperatorAccount, async (req, res) => {
	try {
		const account = req.body;
		const { email_address, mobile_number } = req.body;
		const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
		account.password = hash;
		const isUniqueMobile = await Operators.findBy({ mobile_number });
		console.log(isUniqueMobile);
		if (isUniqueMobile.length === 0) {
			await Operators.insert(account);
			let [op] = await Operators.findBy({ email_address });
			const token = generateToken(op);
			res.status(200).json({
				token
			});
		} else {
			res.status(404).json({
				message:
					'Email address or mobile number is already taken, please enter a unique email or mobile number'
			});
		}
	} catch (err) {
		res.status(500).json(err.message, 'Error creating account');
	}
});

//update operator's accounts
router.put('/:id', authenticate, async (req, res) => {
	try {
		let id = req.params.id;

		let operator = await Operators.updateOp(id, req.body);

		res.status(200).json(operator);
	} catch {
		res.status(500).json({ message: 'error when updating account' });
	}
});

//delete an operator's account
router.delete('/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;

		let [deletedOp] = await Operators.findBy({ id });

		await Operators.removeOp(id);

		res.status(200).json(deletedOp);
	} catch {
		res.status(500).json({ message: 'error when deleting operator account' });
	}
});

//login for operators
router.post('/login', validateLogin, async (req, res) => {
	try {
		let { email_address, password } = req.body;
		const account = await Operators.findBy({ email_address }).first();
		if (account && bcrypt.compareSync(password, account.password)) {
			const token = generateToken(account);
			res.status(200).json({ token });
		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error logging in' });
	}
});

//assign an operator to a sensor
router.post('/assigned/operator', authenticate, async (req, res) => {
	const sensorId = req.body.sensor_id;
	const operatorId = req.body.operator_id;

	const isValidSensorId = await Sensors.getSensorBySensorId(sensorId);
	const isValidOperatorId = await Operators.getOperatorById(operatorId);

	if (isValidSensorId.length > 0 && isValidOperatorId.length > 0) {
		Operators.assignOperator(req.body)
			.then(operator => {
				res.status(200).json(req.body);
			})
			.catch(err => res.status(500).json(err.message));
	} else {
		res.status(404).json({
			message:
				'Invalid sensor or operator id, please enter a valid sensor or operator id'
		});
	}
});

module.exports = router;
