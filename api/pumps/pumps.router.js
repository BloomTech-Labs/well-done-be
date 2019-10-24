const router = require("express").Router();
const Pumps = require("./pumps.model");
const { validatePump } = require("../middleware/middleware");

//POST a pump - WORKING
router.post("/", validatePump, (req, res) => {
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

//this router gets just pumps
router.get("/", async (req, res) => {
  try {
    const pumps = await Pumps.findPumps();
    res.status(200).json(pumps);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//get pump by id working
//GET a pump by id - WORKING
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Pumps.getPumpById(id)
    .then(pump => {
      if (pump) {
        res.status(200).json(pump);
      } else res.status(404).json({ message: "pump does not exist" });
    })
    .catch(err => res.status(500).json(err.message));
});

// update pump working
// update pump - WORKING but doesnt return a message on Postman/Insomnia
router.put(
  "/:id",
  validatePump,
  // authenticate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      await Pumps.updatePump(changes, id);
      res.status(200).json({ message: "Pump edited successfully." });
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  }
);
// update delete working
//DELETE a pump
router.delete("/:id", (req, res) => {
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

//GET pumps by orgs
router.get("/org/:id", (req, res) => {
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

module.exports = router;
