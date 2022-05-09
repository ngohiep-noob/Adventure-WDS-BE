require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDatabase = require("./src/config/database.config");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
connectDatabase();

const http = require("http");
const server = http.createServer(app);

//realtime chatting
require("./src/commons/socket")(server);

app.use("/api", require("./src/apis/index"));

app.get("/", (req, res, next) => {
  return res.sendFile(__dirname + '/public/hello.html')
});

app.use((error, req, res, next) => {
  let { statusCode, message } = error;

  statusCode = statusCode ? statusCode : 500;
  console.log(error);

  res.status(statusCode).json({
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 300;

server.listen(PORT, async () => {
  console.log("Server is running on port ", PORT);
});
