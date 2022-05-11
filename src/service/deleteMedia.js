const { google } = require("googleapis");
const createError = require("http-errors");
const {oauthCredentials} = require('../middleware/google-uploadFile')

module.exports = {
    deleteFile: async(fileId) => {
        try {
            const response = await google.drive({ version: 'v3', auth: oauthCredentials()}).files.delete({
                fileId: fileId,
            })
            return response;
        } catch (error) {
            throw new createError(500, error.message);
        }
    }
}