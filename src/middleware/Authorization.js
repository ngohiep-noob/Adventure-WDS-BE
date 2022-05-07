const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");


module.exports = {
  async VerifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token)
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "UNAUTHORIZED",
      });
    }
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.userInfo = decodeToken;
      next();
    } catch (error) {
      next(new createHttpError(403, error.message));
    }
  },
  async VerifyTeacher(req, res, next) {
    if (req.userInfo.isTeacher === false) {
      return res.status(401).json({
        message: "UNAUTHORIZED!",
      });
    }
    return next();
  }
};
