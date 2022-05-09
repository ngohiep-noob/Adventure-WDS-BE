const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const Course = require("../../model/course.js");
const {
  StoreThumbToDB,
  StoreVideoToDB,
} = require("../../service/uploadMedia.js");

module.exports = {
  CreateNewCourse: async ({ body, files }) => {
    try {
      let { name, views, rating, description } = body;
      views = views ? views : 0;
      rating = rating ? rating : 0;
      if (!description || !name) {
        throw new createHttpError(400, "Description and name is required!");
      }
      const resDB = await Course.create({ name, views, rating, description });

      let resUploadMedia = {};

      //upload file
      if (files.thumb) {
        const fileId = files.thumb[0].filename.split("/").at(-1),
          filePath = files.thumb[0].path;

        const thumbInfo = await StoreThumbToDB(
          Course,
          resDB._id,
          filePath,
          fileId
        );

        resUploadMedia.thumbnail = thumbInfo;
      }

      if (files.videos) {
        console.log(files.videos[0]);
        const videosInfo = await StoreVideoToDB(
          Course,
          resDB._id,
          files.videos
        );

        resUploadMedia.videos = videosInfo;
      }

      return {
        message: "success",
        data: {
          _id: resDB._id,
          name: resDB.name,
          desc: resDB.description,
          ...resUploadMedia,
        },
      };
    } catch (error) {
      throw createHttpError(500, error.message);
    }
  },
  GetCourseById: async (courseId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new createHttpError(404, "Course not found!");
      }

      const course = await Course.findById(courseId);

      if (!course) throw new createHttpError(404, "Course not found!!");
      return {
        message: "success",
        courseInfo: course,
      };
    } catch (error) {
      throw error;
    }
  },
  GetAllCourse: async (qPage, qSort, pageSize) => {
    let Courses;
    let startIndex;
    try {
      if (qPage) {
        qPage = parseInt(qPage);
        qPage < 1 ? (qPage = 1) : qPage;
        startIndex = (qPage - 1) * pageSize;
      }
      if (qPage && !qSort) {
        Courses = await Course.find().skip(startIndex).limit(pageSize);
      } else if (qPage && qSort) {
        if (qSort === "asc") {
          Courses = await Course.find()
            .sort({ _id: 1 })
            .skip(startIndex)
            .limit(pageSize);
        } else if (qSort === "desc") {
          Courses = await Course.find()
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(pageSize);
        }
      } else if (!qPage && qSort) {
        if (qSort === "asc") {
          Courses = await Course.find().sort({ _id: 1 });
        } else if (qSort === "desc") {
          Courses = await Course.find().sort({ _id: -1 });
        }
      } else {
        Courses = await Course.find();
      }
      return {
        message: "ok",
        courseInfo: Courses,
      };
    } catch (error) {
      throw new createHttpError(error);
    }
  },
  SearchByName: async (name) => {
    try {
      if (!name) {
        throw new createHttpError(400, "courseName is required!");
      }

      const resDB = await Course.find({
        name: {
          $regex: name,
          $options: 'i',
        },
      });
      return resDB;
    } catch (error) {
      throw new createHttpError(error.message || 500, error.message);
    }
  },
};
