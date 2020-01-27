require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { authenticate } = require('../middleware/middleware');

const Logs = require('./operator_logs.model');
const Operators = require('../operators/operators.model');
const Sensors = require('../sensors/sensors.model');

//get all logs
router.get('/', authenticate, (req, res) => {
	Logs.getLogs()
		.then(logs => {
			res.status(200).json(logs);
		})
		.catch(err => res.status(500).json(err.message));
});

//get logs by operator id
router.get('/operator', authenticate, async (req, res) => {
	let token = req.headers.authorization.split(' ');
	const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

	Logs.getLogsByOperatorId(decoded.subject)
		.then(logs => {
			res.status(200).json(logs);
		})
		.catch(err => res.status(500).json(err.message));
});

//add a log to the sensor_logs table
router.post('/', authenticate, async (req, res) => {
	let token = req.headers.authorization.split(' ');
	const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

	const { sensor_id } = req.body;

	if (!sensor_id)
		res.status(400).json({ errorMessage: 'Please provide a sensor id.' });

	const isValidSensorId = await Sensors.getSensorBySensorId(sensor_id);
	const isValidOperatorId = await Operators.getOperatorById(decoded.subject);

	if (isValidSensorId.length === 0)
		res.status(400).json({ errorMessage: 'Please provide a valid sensor id.' });

	if (isValidOperatorId.length === 0)
		res
			.status(400)
			.json({ errorMessage: 'Please provide a valid operator id.' });

	req.body = {
		...req.body,
		operator_id: decoded.subject,
		last_modified: new Date()
	};

	Logs.addLog(req.body)
		.then(logs => {
			res.status(201).json(req.body);
		})
		.catch(err => res.status(500).json(err.message));
});

//update a log
router.put('/:id', authenticate, async (req, res) => {
	let token = req.headers.authorization.split(' ');
	const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

	const id = req.params.id;
	let info = req.body;

	let [getLog] = await Logs.findById(id);

	if (getLog.operator_id === decoded.subject) {
		info = { ...info, last_modified: new Date() };

		Logs.update(id, info)
			.then(logs => {
				res.status(200).json({ message: 'Successfully updated log' });
			})
			.catch(error => {
				res.status(500).json({
					error: 'Error when updating log.'
				});
			});
	} else {
		res.status(401).json({ message: 'You are not allowed to update this log' });
	}
});

router.delete('/:id', authenticate, async (req, res) => {
	let token = req.headers.authorization.split(' ');
	const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

	const id = req.params.id;

	let [getLog] = await Logs.findById(id);

	if (getLog.operator_id === decoded.subject) {
		Logs.remove(id)
			.then(logs => {
				res.status(200).json({ message: 'Successfully deleted log' });
			})
			.catch(error => {
				res.status(500).json({
					error: 'Error when deleting log.'
				});
			});
	} else {
		res.status(401).json({ message: 'You are not allowed to delete this log' });
	}
});

module.exports = router;
