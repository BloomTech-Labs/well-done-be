require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const datauri = require('datauri');
const path = require('path');
const multer = require('multer');

const { authenticate } = require('../middleware/middleware');

const Logs = require('./operator_logs.model');
const Operators = require('../operators/operators.model');
const Sensors = require('../sensors/sensors.model');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage }).any();

const dUri = new datauri();

router.post('/upload', (req, res) => {});

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

	console.log(decoded);

	Logs.getLogsByOperatorId(decoded.id)
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

	if (isValidSensorId.length === 0)
		res.status(400).json({ errorMessage: 'Please provide a valid sensor id.' });

	req.body = {
		...req.body,
		operator_id: decoded.id,
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

	if (getLog.operator_id === decoded.id) {
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

	if (getLog.operator_id === decoded.id) {
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

//add a picture to its associated log
router.post('/images', authenticate, (req, res) => {
	upload(req, res, async function(err) {
		if (req.files.length === 1) {
			let formatted = dUri.format(
				path.extname(req.files[0].originalname).toString(),
				req.files[0].buffer
			);
			cloudinary.uploader.upload(formatted.content, async function(
				error,
				result
			) {
				if (error) {
					return error;
				} else {
					let results = await Logs.addImage({
						image_url: result,
						...JSON.parse(req.body.metaData)
					});
					res
						.status(201)
						.json({ message: 'Successfully posted log', ...results });
				}
			});
		} else {
			let results = {
				urls: [],
				metaData: {}
			};

			for (let i = 0; i < req.files.length; i++) {
				let formatted = dUri.format(
					path.extname(req.files[i].originalname).toString(),
					req.files[i].buffer
				);
				await cloudinary.uploader.upload(formatted.content, function(
					error,
					result
				) {
					if (error) {
						return error;
					} else {
						results.urls.push(result.secure_url);
					}
				});
			}

			results = {
				...results,
				metaData: {
					...JSON.parse(req.body.metaData)
				}
			};

			console.log(results);

			try {
				for (let i = 0; i < results.urls.length; i++) {
					await Logs.addImage({
						image_url: results.urls[i],
						log_id: results.metaData.log_id,
						caption: results.metaData.caption
					});
				}

				res
					.status(201)
					.json({ message: 'Successfully posted log', ...results });
			} catch (err) {
				res.status(500).json(err);
			}
		}
	});
});

router.get('/images', authenticate, async (req, res) => {
	try {
		let images = await Logs.getImages();
		res.status(200).json(images);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
