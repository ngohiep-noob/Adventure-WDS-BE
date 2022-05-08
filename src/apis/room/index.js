const route = require("express").Router();
const roomController = require("./room.controller");
const { VerifyToken } = require("../../middleware/Authorization");
const multer = require("multer");
const storage = require("../../middleware/Cloudinary.storage");

const uploadImage = multer({ storage: storage('WDS/Rooms') });
require('../../config/cloudinary.config')

route.post(
  "/",
  VerifyToken,
  uploadImage.fields([{ name: "thumb" }]),
  roomController.CreateRoom
);

route.get('/:id', roomController.GetRoomById);

route.get('/', roomController.GetAllRoom)

module.exports = route;
