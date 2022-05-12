const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const Course = require("../../model/course.js");
const {
  UploadAndStoreThumbToDB: StoreThumbToDB,
  UploadAndStoreVideoToDB: StoreVideoToDB,
  UploadAndStorePDFToDB: StorePDFToDB,
} = require("../../service/uploadMedia.js");
const User = require("../../model/user");
const { deleteFile } = require("../../service/deleteMedia.js");
const { SearchByName } = require('../../service/searchByName')

module.exports = {
  CreateNewCourse: async ({ body, files, userInfo }) => {
    try {
      let { name, views, rating, description } = body;
      const authorId = userInfo.userId;
      views = views ? views : 0;
      rating = rating ? rating : 0;
      if (!description || !name) {
        throw new createHttpError(400, "Description and name is required!");
      }
      const resDB = await Course.create({
        name,
        views,
        rating,
        description,
        author: authorId,
      });

      // update author's course
      await User.findByIdAndUpdate(authorId, {
        $push: { courses: resDB._id },
      });

      let resUploadMedia = {};
      //upload file
      if (files.thumb) {
        const thumbInfo = await StoreThumbToDB(
          Course,
          resDB._id,
          files.thumb[0]
        );

        resUploadMedia.thumbnail = thumbInfo;
      }

      if (files.videos) {
        const videosInfo = await StoreVideoToDB(
          Course,
          resDB._id,
          files.videos
        );

        resUploadMedia.videos = videosInfo;
      }

      if (files.pdf) {
        const pdfInfo = await StorePDFToDB(Course, resDB._id, files.pdf);

        resUploadMedia.pdf = pdfInfo;
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

      const resDB = await SearchByName(Course, name);;
      return resDB;
    } catch (error) {
      throw new createHttpError(error.message || 500, error.message);
    }
  },
  DeleteCourseById: async(courseId) => {
    try {
      const courseInfo = await Course.findById(courseId);
      if(courseInfo) {
        //delete thumbnail
        await deleteFile(courseInfo.thumbnail.id)
        //delete video
        await Promise.all(courseInfo.videos.map(vid => {
          return deleteFile(vid.id);
        }))
        //delete pdf
        await Promise.all(courseInfo.pdf.map(pdf => {
          return deleteFile(pdf.id);
        }))
        await Course.findByIdAndDelete(courseId);
      }
      return {
        message: "ok"
      }
    } catch (error) {
      throw new createHttpError(error.statusCode || 500, error.message)
    }
  }
};
