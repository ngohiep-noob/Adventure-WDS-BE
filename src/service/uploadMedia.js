const createHttpError = require("http-errors");
const { uploadFile } = require("../middleware/google-uploadFile");

module.exports = {
  UploadAndStoreThumbToDB: async (model, modelId, file) => {
    try {
      const uploadRes = await uploadFile(file);
      await model.findByIdAndUpdate(modelId, {
        thumbnail: {
          url: process.env.REDIRECT_GG_FILE + uploadRes.id,
          id: uploadRes.id,
        },
      });
      return {
        url: process.env.REDIRECT_GG_FILE + uploadRes.id,
        id: uploadRes.id,
      };
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
  UploadAndStoreVideoToDB: async (model, modelId, videos) => {
    try {
      const videoData = await Promise.all(
        videos.map((vid) => {
          return uploadFile(vid);
        })
      );

      const newVideos = videoData.map((vid) => {
        return {
          name: vid.name.split(".")[0],
          id: vid.id,
          url: process.env.REDIRECT_GG_FILE + vid.id,
        };
      });

      await model.findByIdAndUpdate(modelId, {
        $push: { videos: { $each: newVideos } },
      });

      return newVideos;
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
  UploadAndStorePDFToDB: async (model, modelId, files) => {
    try {
      const fileData = await Promise.all(
        files.map((file) => {
          return uploadFile(file);
        })
      );

      const newFiles = fileData.map((file) => {
        return {
          name: file.name.split(".")[0],
          id: file.id,
          url: process.env.REDIRECT_GG_FILE + file.id,
        };
      });

      await model.findByIdAndUpdate(modelId, {
        $push: { pdf: { $each: newFiles } },
      });

      return newFiles;
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
};
