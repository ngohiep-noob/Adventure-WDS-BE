const {
  VerifyToken,
  VerifyTeacher,
} = require("../../middleware/Authorization");
const learningPathController = require("./learningPath.controller");
const storage = require("../../middleware/Cloudinary.storage");
const multer = require("multer");

const upload = multer({ storage: storage('WDS/Learning-Path') });
require('../../config/cloudinary.config')

const route = require("express").Router();

route.post(
  "/",
  VerifyToken,
  VerifyTeacher,
  upload.fields([{ name: "thumb" }]),
  learningPathController.CreateLearningPath
);

route.get("/:id", learningPathController.GetLearningPathById);

route.get('/', learningPathController.GetAllLearningPath);


route.get('/search/:name', learningPathController.SearchByName);

module.exports = route;
