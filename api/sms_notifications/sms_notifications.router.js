const router = require("express").Router();
const { authenticate } = require("../middleware/middleware.js");
const SMS_Notification = require("./sms_notifications.model.js");

// * get all sms notifications
// TODO: Test
router.get("/", authenticate, async (req, res) => {
  try {
    const sms_notification = await SMS_Notification.find();
    res.status(200).json(sms_notification);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * get sms notifications by id
// TODO: Test
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const sms_notification = await SMS_Notification.findById(id);
    res.status(200).json(sms_notification);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * create sms notifications
// TODO: Test
router.post("/", authenticate, async (req, res) => {
  try {
    const sms_notification = req.body;
    await SMS_Notification.insert(sms_notification);
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * update sms notifications
// TODO: Test
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const update_sms_notification = await SMS_Notification.update(id);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * delete sms notifications
// TODO: Test
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
