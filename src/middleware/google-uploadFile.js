const stream = require("stream");
const googleAuth = require("../config/google.config");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = {
  uploadFile: async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google
      .drive({ version: "v3", auth: oAuth2Client })
      .files.create({
        media: {
          mimeType: fileObject.mimeType,
          body: bufferStream,
        },
        requestBody: {
          name: fileObject.originalname,
          parents: [process.env.DRIVE_FOLDER_ID],
        },
        //   fields: 'id,name,url',
      });
    return data;
    // console.log(`Uploaded file ${data.name} ${data.id}`);
  },
  oauthCredentials: () => {
    return oAuth2Client;
  },
};
