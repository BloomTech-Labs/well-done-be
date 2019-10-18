const router = require("express").Router();
const { authenticate } = require("../middleware/middleware");
const Organizations = require("./organizations.model");

// TODO: get all organizations
router.get("/", authenticate, async (req, res) => {
  try {
    const orgs = await Organizations.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get organization by id
router.get("/:org_id", authenticate, async (req, res) => {
  try {
    const org = await Organizations.findById();
    res.status(200).json(org);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: create organization
router.post("/", async (req, res) => {
  try {
    const { org } = req.body;
    const createdOrg = await Organizations.insert(org);
    res.status(200).json(createdOrg);
  } catch (err) {
    console.log();
    res.status(400).json(err.message);
  }
});

// TODO: update org
router.put("/:org_id", authenticate, async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

//  TODO: delete org
router.delete("/:org_id", authenticate, async (req, res) => {
  try {
    const { org_id } = req.params;
    const removedOrg = await Organizations.remove(org_id);
    res.status(200).json(removedOrg);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
