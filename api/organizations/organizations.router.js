const router = require("express").Router();
// const { authenticate } = require("../middleware/middleware");
const Organizations = require("./organizations.model");

const { validateOrg } = require("../middleware/middleware");
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
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Organizations.findById(id)
    .then(org => {
      console.log("org", org);
      if (org) {
        res.status(200).json(org);
      } else {
        res.status(404).json({ message: "Could not find org with given id." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// TODO: create organization - WORKING
router.post("/", validateOrg, async (req, res) => {
  try {
    const org = req.body;
    console.log("org", org);
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

router.put("/:id", validateOrg, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
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
    const { id } = req.params;
    const removed = await Organizations.remove(id);
    res.status(200).json(removed);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
