const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Adventure_WDS',
        resource_type: 'auto',
        // allowedFormats: ['jpeg', 'png', 'jpg', 'mp3', 'mp4']
    },
});
module.exports = storage;