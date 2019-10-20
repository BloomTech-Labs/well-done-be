const router = require("express").Router();
// const { authenticate } = require("../middleware/middleware");
const Organizations = require("./organizations.model");

// TODO: get all organizations
router.get("/", async (req, res) => {
  try {
    const orgs = await Organizations.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: get organization by id - WORKING
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params
    const org = await Organizations.findById(id);
    res.status(200).json(org);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// TODO: create organization - WORKING
router.post("/", async (req, res) => {
  try {
    const org = req.body;
    console.log("org", org)
    const createdOrg = await Organizations.insert(org);
    res.status(200).json(createdOrg);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});



// TODO: update org
// router.put("/:id", async (req, res) => {
//   try {
//     const {org} = req.body;
//     console.log("org", org)
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json(err.message);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { changes } = req.body;
    const updatedOrg = await Organizations.update(changes, id);
    res.status(200).json(updatedOrg);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});


//  TODO: delete org
router.delete("/:id", async (req, res) => {
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
