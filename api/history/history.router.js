const router = require("express").Router();
const History = require("./history.model");
const { authenticate } = require("../middleware/middleware.js");

//* [find] - /api/history - WORKING :))
router.get("/", (req, res) => {
  History.find()
    .then(history => {
      res.status(200).json(history);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

//* [findByID] - /api/history/1 - WORKING :))
router.get("/:id", (req, res) => {
  const { id } = req.params;
  History.findById(id)
    .then(history => {
      if (history) {
        res.status(200).json(history);
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

//* [insert] - /api/history - WORKING :))
router.post("/", (req, res) => {
  const historyData = req.body;

  History.insert(historyData)
    .then(history => {
      res.status(201).json(history);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

//* [findByID] - api/history/1 - WORKING :))
router.put("/:id", (req, res) => {
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

//* [remove] - api/history/1 - WORKING :))
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await History.remove(id);
    res.status(200).json(id);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

//* [getHistoryBySensorId] - /api/history/sensor/1 - WORKING :))
router.get("/sensor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.getHistoryBySensorId(id);
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
