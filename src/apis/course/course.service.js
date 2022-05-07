const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const cloudinary = require("../../config/cloudinary.config");
const Course = require("../../model/course.js");

module.exports = {
  CreateNewCourse: async ({ body, files }) => {
    try {
      let { name, views, rating, description } = body;
      views = views ? views : 0;
      rating = rating ? rating : 0;

      //upload img
      let resDB;
      if (files) {
        //const pdfRes = await cloudinary.uploader.upload(files.pdf[0].path)
        const videoRes = await cloudinary.uploader.upload(files.video[0].path, {
          resource_type: 'video'
        });
        const thumbRes = await cloudinary.uploader.upload(files.thumb[0].path);
        resDB = await Course.create({
          name,
          views,
          rating,
          description,
          thumbnail: {
            url: thumbRes.secure_url,
            id: thumbRes.public_id,
          },
          video: {
            url: videoRes.secure_url,
            id: videoRes.public_id,
          },
          // pdf: {
          //   url: pdfRes.secure_url,
          //   id: pdfRes.public_id
          // }
        });
      } else {
        resDB = await Course.create({ name, views, rating, description });
      }

      return {
        message: "success",
        data: resDB,
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
};
