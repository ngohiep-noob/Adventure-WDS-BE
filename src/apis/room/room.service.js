const Room = require("../../model/room.js");
const User = require('../../model/user')
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { StoreThumbToDB } = require("../../service/uploadThumbnail.js");

module.exports = {
  CreateRoom: async ({ body, files }) => {
    try {
      const { creatorID, memberIDs, name, learningPathID } = body;

      const members = memberIDs.split(",");
      const resDB = await Room.create({
        name,
        learningPath: learningPathID,
        creator: creatorID,
        members: [...members],
      });

      if (files) {
        const thumbRes = await StoreThumbToDB(
          Room,
          resDB._id,
          files.thumb[0].path
        );

        resDB.thumbnail = {
          url: thumbRes.secure_url,
          id: thumbRes.public_id,
        };
      }

      ///update room field of creator
      await User.findByIdAndUpdate(creatorID, {
        $push: { rooms: resDB._id },
      });

      return {
        data: resDB,
      };
    } catch (error) {
      throw new createHttpError(error);
    }
  },
  GetRoomById: async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new createHttpError(404, "Room not found!");
      }
      let resDB = await Room.findById(id);

      if (!resDB) {
        throw new createHttpError(404, "Room not found!");
      }
      //   console.log(courses);
      await resDB.populate("learningPath creator members");

      return {
        message: "success",
        data: resDB,
      };
    } catch (error) {
      throw error;
    }
  },
  GetAllRoom: async ({ qPage, qSort, pageSize }) => {
    let rooms;
    let startIndex;
    try {
      if (qPage) {
        qPage = parseInt(qPage);
        qPage < 1 ? (qPage = 1) : qPage;
        startIndex = (qPage - 1) * pageSize;
      }
      if (qPage && !qSort) {
        rooms = await Room.find()
          .skip(startIndex)
          .limit(pageSize);
      } else if (qPage && qSort) {
        if (qSort === "asc") {
          rooms = await Room.find()
            .sort({ _id: 1 })
            .skip(startIndex)
            .limit(pageSize);
        } else if (qSort === "desc") {
          rooms = await Room.find()
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(pageSize);
        }
      } else if (!qPage && qSort) {
        if (qSort === "asc") {
          rooms = await Room.find().sort({ _id: 1 });
        } else if (qSort === "desc") {
          rooms = await Room.find().sort({ _id: -1 });
        }
      } else {
        rooms = await Room.find();
      }

      const fullRoomDetails = await Promise.all(
        rooms.map((e) => {
          return e.populate("learningPath creator members");
        })
      );

      console.log(fullRoomDetails);
      return {
        learingPaths: rooms,
      };
    } catch (error) {
      throw new createHttpError(error);
    }
  }
};
