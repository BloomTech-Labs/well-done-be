const router = require("express").Router();
const LastFetch = require("./lastFetch.model");
const { authenticate } = require("../middleware/middleware");

router.get("/", authenticate, (req, res) => {
    LastFetch.find()
      .then(fetch => {
        res.status(200).json(fetch);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });

  module.exports = router;