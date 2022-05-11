const { default: mongoose } = require("mongoose");
const User = require("../../model/user.js");
const Room = require("../../model/room");
const createHttpError = require("http-errors");

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  EnrollCourse: async (courseIds, userId) => {
    try {
      courseIds.map((id) => {
        if (!isValidId(id))
          throw new createHttpError(404, "Cannot find course!");
        return 0;
      });

      await User.findByIdAndUpdate(userId, {
        $push: { courses: { $each: courseIds } },
      });

      let resDB = User.findById(userId).populate("courses rooms");

      return resDB;
    } catch (error) {
      throw error;
    }
  },
  JoinRoom: async (userId, roomId) => {
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { rooms: roomId },
      });

      await Room.findByIdAndUpdate(roomId, {
        $push: { members: userId },
      });

      const userAfterUpdate = await User.findById(userId).populate("rooms");
      return userAfterUpdate;
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
  GetUserById: async (userId) => {
    try {
      const resDB = await User.findById(userId)
      
      resDB.populate('courses rooms')

      if (!resDB) throw new createHttpError(404, "Cannot find user!");
      return resDB;
    } catch (error) {
      throw error;
    }
  },
};
