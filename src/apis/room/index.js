const route = require("express").Router();
const roomController = require("./room.controller");
const { VerifyToken } = require("../../middleware/Authorization");
const multer = require("multer");
const storage = require("../../middleware/Cloudinary.storage");

const upload = multer({ storage: storage });

route.post(
  "/",
  VerifyToken,
  upload.fields([{ name: "thumb" }]),
  roomController.CreateRoom
);

route.get('/:id', roomController.GetRoomById);

route.get('/', roomController.GetAllRoom)

module.exports = route;
