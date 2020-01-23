require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { authenticate } = require('../middleware/middleware');

const Logs = require('./operator_logs.model');
const Operators = require('../operators/operators.model');
const Sensors = require('../sensors/sensors.model');

router.get('/', authenticate, (req, res) => {
	Logs.getLogs()
		.then(logs => {
			res.status(200).json(logs);
		})
		.catch(err => res.status(500).json(err.message));
});

router.post('/', authenticate, async (req, res) => {
	let token = req.headers.authorization.split(' ');
	const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

	let [opInfo] = await Operators.findByEmail(decoded.subject);

	const { sensor_id } = req.body;

	if (!sensor_id)
		res.status(400).json({ errorMessage: 'Please provide a sensor id.' });

	const isValidSensorId = await Sensors.getSensorBySensorId(sensor_id);
	const isValidOperatorId = await Operators.getOperatorById(opInfo.id);

	if (isValidSensorId.length === 0)
		res.status(400).json({ errorMessage: 'Please provide a valid sensor id.' });

	if (isValidOperatorId.length === 0)
		res
			.status(400)
			.json({ errorMessage: 'Please provide a valid operator id.' });

	//to fill in the last_modified property
	req.body = { ...req.body, operator_id: opInfo.id, last_modified: new Date() };

	Logs.addLog(req.body)
		.then(logs => {
			res.status(200).json(req.body);
		})
		.catch(err => res.status(500).json(err.message));
});

module.exports = router;
