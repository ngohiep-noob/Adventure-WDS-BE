const Room = require("../../model/room.js");
const User = require('../../model/user')
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { StoreThumbToDB } = require("../../service/uploadMedia.js");
const learningPath = require("../../model/learningPath.js");
const { SearchByName} = require('../../service/searchByName')

module.exports = {
  CreateRoom: async ({ body, files, userInfo }) => {
    try {
      const {userId: creatorID} = userInfo
      const { memberIDs, name, learningPathID } = body;

      if(!name || !learningPathID) {
        throw new createHttpError(400, 'name and learning path id is required!');
      }

      let members
      if(memberIDs) {
        members = memberIDs.split(",");
      }else {
        members = [];
      }


      const resDB = await Room.create({
        name,
        learningPath: learningPathID,
        creator: creatorID,
        members: [...members],
      });

      //update room to learning path
      await learningPath.findByIdAndUpdate(learningPathID, {
        $push: {rooms: resDB._id}
      })

      ///update room field of creator
      await User.findByIdAndUpdate(creatorID, {
        $push: { rooms: resDB._id },
      });

      if (files.thumb) {
        const thumbInfo = await StoreThumbToDB(
          Room,
          resDB._id,
          files.thumb
        );

        var thumbnail = thumbInfo;
      }

      
      return {
        message: "ok",
        data: {
          _id: resDB._id, 
          name: resDB.name,
          learingPaths: resDB.learningPath,
          members: resDB.members,
          creator: resDB.creator,
          thumbnail 
        }
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
  },
  SearchByName: async (name) => {
    try {
      if (!name) {
        throw new createHttpError(400, "roomName is required!");
      }

      const resDB = await SearchByName(Room, name);
      return resDB;
    } catch (error) {
      throw new createHttpError(error.message || 500, error.message);
    }
  },
};
