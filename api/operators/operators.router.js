const router = require('express').Router();
const { authenticate } = require('../middleware/middleware');
const Operators = require('./operators.model');

router.get('/', authenticate, (req, res) => {
	Operators.getAll()
		.then(operator => {
			res.status(200).json(operator);
		})
		.catch(err => res.status(500).json(err.message));
});

module.exports = router;
