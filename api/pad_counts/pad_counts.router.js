const router = require("express").Router();
const PadCounts = require("./pad_counts.model")
const { authenticate } = require("../middleware/middleware");

router.get("/", authenticate, async (req, res) => {
    try {
      const pad = await PadCounts.find();
      res.status(200).json(pad);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

  router.post("/", authenticate, async (req, res) => {
    try {
      const count = req.body;
      console.log("count", count);
      const createdPadCount = await PadCounts.add(count);
      res.status(200).json(createdPadCount);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

  router.put("/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const updatedPadCounts = await PadCounts.updatePadCounts(changes, id);
      res.status(200).json(updatedPadCounts);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });
module.exports = router;
