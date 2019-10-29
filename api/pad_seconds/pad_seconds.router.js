const router = require("express").Router();
const PadSeconds = require("./pad_seconds.model")

// router.get("/", async (req,res) => {
//     try {
//         const padSeconds = await PadSeconds.find()
//         res.status(200).json(padSeconds)
//     } catch (e) {
//         res.status(400).json(e.message)
//     }
// })

router.get("/", async (req, res) => {
    try {
      const pad = await PadSeconds.find();
      res.status(200).json(pad);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  });

module.exports = router;
