const createHttpError = require("http-errors");

module.exports = {
  StoreThumbToDB: async (model, modelId, filePath, fileId) => {
    try {
      const urlEndPoint = filePath.split("/");
      const finalUrl = [
        ...urlEndPoint.slice(0, 6),
        "w_350,h_200,c_scale",
        ...urlEndPoint.slice(6),
      ].join("/");
      console.log(finalUrl);
      await model.updateOne(
        { _id: modelId },
        {
          thumbnail: {
            url: finalUrl,
            id: fileId,
          },
        }
      );

      return {
        url: finalUrl,
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
          id = vid.filename.split("/").at(-1),
          name = vid.originalname.split(".")[0];

        return {
          url,
          id,
          name,
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
