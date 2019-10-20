const router = require("express").Router();
const History = require("./history.model");
const { authenticate } = require("../middleware/middleware.js");

// TODO: get all history
router.get("/", async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get history by SENSOR ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findBySensorId(id);
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get history by Org ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findByOrgId(id);
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get history by Pump ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findByPumpId(id);
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get history by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findById(id);
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: post to history
router.post("/", async (req, res) => {
  try {
    const { history } = req.body;
    const createdHistory = await History.insert(history);
    res.status(200).json(createdHistory);
  } catch (err) {
    console.log();
    res.status(400).json(err.message);
  }
});

// TODO: update history
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { changes } = req.body;
    const updatedHistory = await History.update(changes, id);
    res.status(200).jsob(updatedHistory);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: delete history
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedHistory = await History.remove(id);
    res.status(200).json(removedHistory);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
