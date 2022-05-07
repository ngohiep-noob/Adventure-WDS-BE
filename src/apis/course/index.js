const route = require("express").Router();
const { VerifyTeacher, VerifyToken } = require("../../middleware/Authorization.js");
const courseController = require("./course.controller.js");
const storage = require("../../middleware/Cloudinary.storage");
const multer = require("multer");

const upload = multer({ storage: storage });

//get course
route.get("/:id", courseController.GetCourseById);

route.get("/", courseController.GetAllCourse);

//create course
route.post(
  "/",
  VerifyToken,
  VerifyTeacher,
  upload.fields([{ name: "thumb" }, { name: "pdf" }, {name: "video"}]),
  courseController.CreateNewCourse
);

module.exports = route;
