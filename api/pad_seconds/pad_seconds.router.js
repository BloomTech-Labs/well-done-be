const router = require("express").Router();
const PadSeconds = require("./pad_seconds.model")

router.get("/", async (req,res) => {
    try {
        const padSeconds = await PadSeconds.find()
        res.status(200).json(padSeconds)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

module.exports = router;
