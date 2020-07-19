const router = require("express").Router();
const History = require("./history.model");
const { authenticate } = require("../middleware/middleware");
const { validateHistory } = require("../middleware/middleware");

// GET to /api/history
router.get("/", authenticate, (req, res) => {
	History.find()
		.then(history => {
			res.status(200).json(history);
		})
		.catch(err => {
			res.status(500).json({ message: err.message });
		});
});

// GET recent history /api/history/recent
router.get("/recent", authenticate, async (req, res) => {
	try {
		let recentHistory = await History.findRecent();
		res.status(200).json(recentHistory);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//GET to /api/history/1
router.get("/:id", authenticate, (req, res) => {
	const { id } = req.params;
	History.getHistoryById(id)
		.then(history => {
			if (history) {
				res.json(history);
			} else {
				res
					.status(404)
					.json({ message: "Could not find history with given id." });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "Failed to get history" });
		});
});

router.get("/sensor_id/:id", authenticate, (req, res) => {
	const { id } = req.params;
	History.getHistoryBySensorId(id)
		.then(history => {
			if (history) {
				res.json(history);
			} else {
				res
					.status(404)
					.json({ message: "Could not find history with given id." });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "Failed to get history" });
		});
});

// POST to /api/history
router.post("/", authenticate, validateHistory, (req, res) => {
	const historyData = req.body;

	History.insert(historyData)
		.then(history => {
			res.status(201).json(history);
		})
		.catch(err => {
			res.status(500).json({ message: err.message });
		});
});

// PUT to /api/history 2
router.put("/:id", authenticate, validateHistory, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	History.findById(id)
		.then(history => {
			if (history) {
				History.update(changes, id).then(changes => {
					res.json(changes);
				});
			} else {
				res
					.status(404)
					.json({ message: "Could not find history with given id" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "Failed to update history" });
		});
});

// DELETE to /api/history/3
router.delete("/:id", authenticate, async (req, res) => {
	try {
		const { id } = req.params;
		await History.remove(id);
		res.status(200).json(id);
	} catch (err) {
		console.log(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
