const router = require("express").Router();
const { authenticate } = require("../middleware/middleware.js");
const SMS_Notification = require("../sms_notifications/sms_notifications.model.js");
const { validateSms } = require("../middleware/middleware");

//* [get] - get all sms notifications - test worked
router.get("/", authenticate, async (req, res) => {
  try {
    const sms_notification = await SMS_Notification.get();
    res.status(200).json(sms_notification);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

//* [getById] - sms notifications by id - test worked
router.get("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  SMS_Notification.getById(id)
    .then(sms => {
      if (sms) {
        res.status(200).json(sms);
      } else res.status(404).json({ message: "sms does not exist" });
    })
    .catch(err => res.status(500).json(err.message));
});

//* [create] - create sms notifications
router.post("/", authenticate, async (req, res) => {
  try {
    const sms_notification = req.body;
    const notification = await SMS_Notification.create(sms_notification)
    console.log(notification)
    res.status(200).json(notification);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

//* [update] - update sms notifications - test worked
router.put("/:id", authenticate, validateSms, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await SMS_Notification.update(changes, id);
    res.status(200).json(changes);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

//* [remove] - delete sms notifications - test worked
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await SMS_Notification.remove(id);
    res.status(200).json(removed);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
