const createHttpError = require("http-errors");
const LearningPath = require("../../model/learningPath");
const Cloudinary = require("../../config/cloudinary.config");
const { default: mongoose } = require("mongoose");

module.exports = {
  CreateLearningPath: async ({ body, files }) => {
    try {
      let { name, rating, courses } = body;
      rating = rating || 0;
      coursesArr = courses.split(",");
      let databaseRes;
      if (files) {
        const thumbRes = await Cloudinary.uploader.upload(files.thumb[0].path);

        databaseRes = await LearningPath.create({
          name,
          rating,
          courses: [...coursesArr],
          thumbnail: {
            url: thumbRes.secure_url,
            id: thumbRes.public_id,
          },
        });
      } else {
        databaseRes = await LearningPath.create({
          name,
          rating,
          courses: [...coursesArr],
        });
      }
      console.log(databaseRes);
      return {
        message: "success",
        data: databaseRes,
      };
    } catch (error) {
      const errorStatus = error.statusCode || 500;
      throw new createHttpError(errorStatus, error.message);
    }
  },
  GetLearingPathById: async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new createHttpError(404, "Learning path not found!");
      }
      let resDB = await LearningPath.findById(id);

      if (!resDB) {
        throw new createHttpError(404, "Learning path not found!");
      }
      //   console.log(courses);
      resDB = await LearningPath.findById(id).populate("courses");

      return {
        message: "success",
        data: resDB,
      };
    } catch (error) {
      throw error;
    }
  },
};
