require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const datauri = require("datauri");
const path = require("path");
const multer = require("multer");

const { authenticate } = require("../middleware/middleware");

const Logs = require("./operator_logs.model");
const Sensors = require("../sensors/sensors.model");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage }).any();

const dUri = new datauri();

//get all logs
router.get("/", authenticate, (req, res) => {
  Logs.getAllLogs()
    .then(logs => {
      res.status(200).json(logs);
    })
    .catch(err => res.status(500).json(err.message));
});

//get logs by operator id
router.get("/operator", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  Logs.getLogsByOperatorId(decoded.id)
    .then(logs => {
      res.status(200).json(logs);
    })
    .catch(err => res.status(500).json(err.message));
});

//get logs by sensor id
router.get("/sensor/:id", authenticate, async (req, res) => {
  Logs.getLogsBySensorId(req.params.id)
    .then(logs => {
      res.status(200).json(logs);
    })
    .catch(err => res.status(500).json(err.message));
});

//add a log to the sensor_logs table
router.post("/", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  const { sensor_id } = req.body;

  if (!sensor_id)
    res.status(400).json({ errorMessage: "Please provide a sensor id." });

  const isValidSensorId = await Sensors.getSensorBySensorId(sensor_id);

  if (isValidSensorId.length === 0)
    res.status(400).json({ errorMessage: "Please provide a valid sensor id." });

  req.body = {
    ...req.body,
    operator_id: decoded.id
  };

  Logs.addLog(req.body)
    .then(logs => {
      res.status(201).json(logs[0]);
    })
    .catch(err => res.status(500).json(err.message));
});

//update a log
router.put("/:id", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  const id = req.params.id;
  let info = req.body;

  let [getLog] = await Logs.findById(id);

  if (getLog) {
    if (getLog.operator_id === decoded.id) {
      info = { ...info, last_modified: new Date() };

      Logs.update(id, info)
        .then(logs => {
          res.status(200).json({ message: "Successfully updated log" });
        })
        .catch(error => {
          res.status(500).json({
            error: "Error when updating log."
          });
        });
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to update this log" });
    }
  } else {
    res.status(404).json({ message: "Id of log not found" });
  }
});

//delete a log
router.delete("/:id", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  const id = req.params.id;

  let [getLog] = await Logs.findById(id);

  if (getLog) {
    if (getLog.operator_id === decoded.id) {
      Logs.remove(id)
        .then(logs => {
          res.status(200).json({ message: "Successfully deleted log" });
        })
        .catch(error => {
          res.status(500).json({
            error: "Error when deleting log."
          });
        });
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to delete this log" });
    }
  } else {
    res.status(404).json({ message: "Id of log not found" });
  }
});

//add a picture to its associated log
router.post("/images", authenticate, (req, res) => {
  upload(req, res, async function(err) {
    let data = JSON.parse(req.body.metaData);
    if (!data.log_id)
      res
        .status(500)
        .json({ message: "provide a log_id associated with image" });

    if (req.files.length === 1) {
      let formatted = dUri.format(
        path.extname(req.files[0].originalname).toString(),
        req.files[0].buffer
      );
      cloudinary.uploader.upload(formatted.content, async function(
        error,
        result
      ) {
        if (error) {
          return error;
        } else {
          await Logs.addImage({
            image_url: result.secure_url,
            ...JSON.parse(req.body.metaData)
          });
          res.status(201).json({
            message: "Successfully posted log",
            secure_url: result.secure_url,
            ...JSON.parse(req.body.metaData)
          });
        }
      });
    } else {
      let results = {
        urls: [],
        metaData: {}
      };

      for (let i = 0; i < req.files.length; i++) {
        let formatted = dUri.format(
          path.extname(req.files[i].originalname).toString(),
          req.files[i].buffer
        );
        await cloudinary.uploader.upload(formatted.content, function(
          error,
          result
        ) {
          if (error) {
            return error;
          } else {
            results.urls.push(result.secure_url);
          }
        });
      }

      results = {
        ...results,
        metaData: {
          ...JSON.parse(req.body.metaData)
        }
      };

      try {
        for (let i = 0; i < results.urls.length; i++) {
          await Logs.addImage({
            image_url: results.urls[i],
            log_id: results.metaData.log_id,
            caption: results.metaData.caption
          });
        }

        res
          .status(201)
          .json({ message: "Successfully posted log", ...results });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
});

//update a picture to its associated log
router.put("/images/:id", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  const id = req.params.id;

  let [getLog] = await Logs.findByImageLogById(id);

  if (getLog) {
    if (getLog.operator_id === decoded.id) {
      upload(req, res, async function(err) {
        let formatted = dUri.format(
          path.extname(req.files[0].originalname).toString(),
          req.files[0].buffer
        );
        cloudinary.uploader.upload(formatted.content, async function(
          error,
          result
        ) {
          if (error) {
            return error;
          } else {
            let results = await Logs.updateImage(id, {
              image_url: result.secure_url,
              ...JSON.parse(req.body.metaData)
            });
            res
              .status(201)
              .json({ message: "Successfully updated image", ...results });
          }
        });
      });
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to update this image" });
    }
  } else {
    res.status(404).json({ message: "Id of image log not found" });
  }
});

//delete an image from its associated log
router.delete("/images/:id", authenticate, async (req, res) => {
  let token = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token[0], process.env.JWT_SECRET);

  const id = req.params.id;

  let [getLog] = await Logs.findByImageLogById(id);

  if (getLog) {
    if (getLog.operator_id === decoded.id) {
      try {
        await Logs.removeImage(id);

        res.status(200).json({ message: "Successfully deleted image" });
      } catch (err) {
        res.status(500).json({
          error: "Error when deleting log."
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to delete this image" });
    }
  } else {
    res.status(404).json({ message: "Id of image log not found" });
  }
});

//get all images
router.get("/images", authenticate, async (req, res) => {
  try {
    let images = await Logs.getImages();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get images by log id
router.get("/images/image/:id", authenticate, async (req, res) => {
  console.log("here");
  try {
    let images = await Logs.getByLogIdImages(req.params.id);
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
