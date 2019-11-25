const router = require("express").Router();
const Pumps = require("./pumps.model");
const { validatePump, validatePumpUpdate } = require("../middleware/middleware");
const { authenticate } = require("../middleware/middleware");

//POST to /api/pumps
router.post("/", authenticate, validatePump, (req, res) => {
  const pumpData = req.body;
  console.log("pumpData", pumpData);
  Pumps.addPump(pumpData)
    .then(pump => {
      res.status(201).json(pump);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// GET to /api/pumps
router.get("/", authenticate, async (req, res) => {
  try {
    const pumps = await Pumps.findPumps();
    res.status(200).json(pumps);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//GET to /api/pumps/2
router.get("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  Pumps.getPumpById(id)
    .then(pump => {
      if (pump) {
        res.status(200).json(pump);
      } else res.status(404).json({ message: "pump does not exist" });
    })
    .catch(err => res.status(500).json(err.message));
});

// PUT to /api/pumps/1
router.put("/:id", validatePumpUpdate, authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await Pumps.updatePump(changes, id);
    res.status(200).json({ message: "Pump edited successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

//DELETE to /api/pumps/6
router.delete("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  Pumps.getPumpById(id)
    .then(pump => {
      console.log(pump);
      if (pump) {
        Pumps.deletePump(id)
          .then(count => {
            console.log("fired");
            res.status(200).json({ message: `deleted ${count} pump` });
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "pump does not exist" });
      }
    })
    .catch(err => res.status(500).json(err.message));
});

//GET to /api/pumps/org/2
router.get("/org/:id", authenticate, (req, res) => {
  const { id } = req.params;
  Pumps.getPumpsByOrgId(id)
    .then(pumps => {
      console.log("pumps", pumps);
      res.status(200).json(pumps);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve orgs" });
    });
});

router.post("/village_name", authenticate, (req, res) => {
  let { village_name } = req.body;
  console.log(village_name, "this is the village name")
  Pumps.getPumpsByVillageName({country_name: village_name})
    .then(pumps => {
      console.log("pumps", pumps);
      res.status(200).json(pumps);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve orgs" });
    });
});

module.exports = router;
