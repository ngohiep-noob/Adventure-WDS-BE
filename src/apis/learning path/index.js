const {
  VerifyToken,
  VerifyTeacher,
} = require("../../middleware/Authorization");
const learningPathController = require("./learningPath.controller");
const storage = require("../../middleware/Cloudinary.storage");
const multer = require("multer");

const upload = multer({ storage: storage });

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

module.exports = route;
