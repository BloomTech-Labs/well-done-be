const router = require('express').Router();
const Tickets = require('./tickets.model');

const { validateSensor } = require('../middleware/middleware');
const { authenticate } = require('../middleware/middleware');

router.get('/', authenticate, async (req, res) => {
	Tickets.find()
		.then(res => console.log(res))
		.catch(err => console.log(err));
});
