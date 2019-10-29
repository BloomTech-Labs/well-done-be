const router = require("express").Router();
const PadCounts = require("./pad_counts.model")

router.get("/", async (req,res) => {
    try {
        const padCounts = await PadCounts.find()
        res.status(200).json(padCounts)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

module.exports = router;
