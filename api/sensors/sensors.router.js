const router = require('express').Router();
const Sensors = require('./sensors.model');
const { validateSensor } = require('../middleware/middleware');
const { authenticate } = require('../middleware/middleware');

//POST a sensor
router.post('/', authenticate, (req, res) => {
	const sensorData = req.body;
	console.log('sensorData', sensorData);
	Sensors.addSensor(sensorData)
		.then(sensor => {
			Sensors.getSensorById(Number(sensor)).then(found => {
				res.status(201).json(found);
			});
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

router.get('/recent', authenticate, async (req, res) => {
	try {
		const sensors = await Sensors.findSensorsAndHistories();
		res.status(200).json(sensors);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

router.get('/', authenticate, async (req, res) => {
	try {
		const sensors = await Sensors.getSensorNPump();
		res.status(200).json(sensors);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

//gets sensor and pump
router.get('/pumps', authenticate, async (req, res) => {
	try {
		const sensors = await Sensors.getSensorNPump();
		res.status(200).json(sensors);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});
// gets sensor and pump
router.get('/details', authenticate, async (req, res) => {
	try {
		const sensors = await Sensors.getSensorNPumpNHistory();
		res.status(200).json(sensors);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

//GET a sensor by sensor_id
router.get('/:id', authenticate, (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	Sensors.getSensorById(id)
		.then(sensor => {
			if (sensor) {
				res.status(200).json(sensor);
			} else res.status(404).json({ message: 'sensor does not exist' });
		})
		.catch(err => res.status(500).json(err.message));
});

//get sensor by physical_id

router.get('/recent/sensor_id/:id', authenticate, (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	Sensors.findSensorsAndHistoriesBySensorsPhysicalId(id)
		.then(sensor => {
			if (sensor) {
				res.status(200).json(sensor);
			} else res.status(404).json({ message: 'sensor does not exist' });
		})
		.catch(err => res.status(500).json(err.message));
});


router.get('/recent/org_id')

//GET a sensor by org_id
router.get('/org/:id', authenticate, (req, res) => {
	const { org_id } = req.params;
	console.log(org_id);
	Sensors.getSensorByOrgId(org_id)
		.then(sensor => {
			console.log(sensor);
			res.status(201).json(sensor);
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

// GET to /api/sensors/2
router.get('/:id', authenticate, (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	Sensors.getSensorById(id)
		.then(sensor => {
			if (sensor) {
				res.status(200).json(sensor);
			} else res.status(404).json({ message: 'sensor does not exist' });
		})
		.catch(err => res.status(500).json(err.message));
});

// GET to /api/sensors/org/2
router.get('/org/:id', authenticate, (req, res) => {
	const { org_id } = req.params;
	console.log(org_id);
	Sensors.getSensorByOrgId(org_id)
		.then(sensor => {
			if (sensor) {
				res.status(200).json(sensor);
			} else res.status(404).json({ message: 'sensor does not exist' });
		})
		.catch(err => res.status(500).json(err.message));
});

// PATCH to /api/sensors/4
router.patch('/:id', authenticate, validateSensor, (req, res) => {
	const change = req.body;
	const { id } = req.params;
	Sensors.getSensorById(id)
		.then(sensor => {
			if (sensor) {
				Sensors.updateSensor(id, change)
					.then(count => {
						res.status(200).json({ message: `updated ${count} sensor` });
					})
					.catch(err => res.status(500).json(err));
			} else {
				res.status(404).json({ message: 'sensor does not exist' });
			}
		})
		.catch(err => res.status(500).json(err.message));
});

// DELETE to /api/sensors/5
router.delete('/:id', authenticate, (req, res) => {
	const { id } = req.params;
	Sensors.getSensorById(id)
		.then(sensor => {
			if (sensor) {
				Sensors.deleteSensor(id)
					.then(count => {
						res.status(200).json(sensor);
					})
					.catch(err => res.status(500).json(err));
			} else {
				res.status(404).json({ message: 'sensor does not exist' });
			}
		})
		.catch(err => res.status(500).json(err.message));
});

module.exports = router;
