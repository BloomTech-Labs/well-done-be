const router = require("express").Router();
const PadCounts = require("./pad_counts.model")

// router.get("/", async (req,res) => {
//     try {
//         const padCounts = await PadCounts.find()
//         res.status(200).json(padCounts)
//     } catch (e) {
//         res.status(400).json(e.message)
//     }
// })

router.get("/", async (req, res) => {
    try {
      const pad = await PadCounts.find();
      res.status(200).json(pad);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

  router.post("/", async (req, res) => {
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

module.exports = router;
