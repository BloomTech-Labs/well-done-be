const router = require('express').Router();
const Tickets = require('./tickets.model');

const { validateSensor } = require('../middleware/middleware');
const { authenticate } = require('../middleware/middleware');

router.get('/', authenticate, async (req, res) => {
	Tickets.find()
		.then(response => res.status(200).json(response))
		.catch(err => res.status(500).json({ message: 'Failed to get tickets' }));
});
