const userService = require("./user.service");

module.exports = {
  EnrollCourse: async (req, res, next) => {
    try {
      const DTO = await userService.EnrollCourse(
        req.body.courseIds,
        req.userInfo.userId
      );

      return res.json({
        message: "success",
        data: DTO,
      });
    } catch (error) {
      next(error);
    }
  },
  JoinRoom: async (req, res, next) => {
      try {
        const userId = req.userInfo.userId, roomId = req.params.roomId;
        const DTO = await userService.JoinRoom(userId, roomId);

        return res.json({
            message: 'ok',
            data: DTO
        })
      } catch (error) {
          next(error)
      }
  },
  GetUserById: async(req, res, next) => {
      try {
        const DTO = await userService.GetUserById(req.params.id);

        return res.json({
            message: 'ok',
            data: DTO
        })
      } catch (error) {
          next(error);
      }
  }
};
