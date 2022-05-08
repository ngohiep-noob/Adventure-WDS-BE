const createHttpError = require("http-errors");

module.exports = {
  StoreThumbToDB: async (model, modelId, filePath, fileId) => {
    try {
      await model.updateOne(
        { _id: modelId },
        {
          thumbnail: {
            url: filePath,
            id: fileId,
          },
        }
      );

      return {
        url: filePath,
        id: fileId,
      };
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
  StoreVideoToDB: async (model, modelId, videoArr) => {
    try {
      const newVideos = videoArr.map((vid) => {
        const url = vid.path,
          id = vid.filename.split("/").at(-1);
        return {
          url,
          id,
        };
      });

    //   console.log(newVideos);

      await model.findByIdAndUpdate(modelId, {
        $push: { videos: { $each: newVideos } },
      });

      return newVideos;
    } catch (error) {
      throw new createHttpError(500, error.message);
    }
  },
};
