const route = require("express").Router();
const {
  VerifyTeacher,
  VerifyToken,
} = require("../../middleware/Authorization.js");
const courseController = require("./course.controller.js");
const multer = require("multer");
const storage = require("../../middleware/Cloudinary.storage");

const uploadDrive = multer();
// const uploadCloudinary = multer({ storage: storage("WDS/Courses") });
// require("../../config/cloudinary.config");

//get course
route.get("/:id", courseController.GetCourseById);

route.get("/", courseController.GetAllCourse);

//create course
route.post(
  "/",
  VerifyToken,
  VerifyTeacher,
  // uploadCloudinary.fields([
  //   { name: "thumb", maxCount: 1 },
  //   { name: "videos", maxCount: 5 },
  // ]),
  uploadDrive.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 5 },
    { name: "pdf", maxCount: 5 },
  ]),
  courseController.CreateNewCourse
);

//search course
route.get("/search/:name", courseController.SearchCourse);

route.delete("/:courseId", VerifyToken, VerifyTeacher,courseController.DeleteCourseById);

module.exports = route;
