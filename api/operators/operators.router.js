const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { authenticate } = require('../middleware/middleware');
const { generateToken } = require('../auth/auth.helpers');
const { validateOperatorAccount } = require('../middleware/middleware');

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

//fetch all accounts in the operators table
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
		const {
			email_address,
			first_name,
			last_name,
			mobile_number,
			org_id
		} = req.body;
		const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
		account.password = hash;
		const isUniqueEmail = await Operators.findBy({ email_address });
		const isUniqueMobile = await Operators.findBy({ mobile_number });
		if (isUniqueEmail === 0 && isUniqueMobile === 0) {
			await Operators.insert(account);
			const token = generateToken(account);
			res.status(200).json({
				token,
				first_name,
				last_name,
				mobile_number,
				email_address,
				org_id
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
