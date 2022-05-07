const route = require("express").Router();
const { VerifyToken } = require("../../middleware/Authorization");
const userController = require("./user.controller");

route.post("/enroll", VerifyToken, userController.EnrollCourse);

route.post("/join-room/:roomId", VerifyToken, userController.JoinRoom);

route.get('/', VerifyToken, userController.GetUserById)
module.exports = route;
