const router = require("express").Router();
const PadSeconds = require("./pad_seconds.model")
const { authenticate } = require("../middleware/middleware");

router.get("/", authenticate, async (req, res) => {
    try {
      const pad = await PadSeconds.find();
      res.status(200).json(pad);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

module.exports = router;
