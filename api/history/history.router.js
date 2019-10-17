const router = require("express").Router();

const Historical = require("./history.model");

// TODO: get all historical
router.get("/", async (req, res) => {
  try {
    const history = await Historical.find();
    res.status(200).json(history);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get historical by SENSOR ID

// TODO: get historical by Org

// TODO: get historical by Pump

// TODO: get historical by id

// TODO: post to historical

// TODO: create historical

// TODO: update historical

// TODO: delete historical
