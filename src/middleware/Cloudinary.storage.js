const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = (folderName, resourseType = 'auto') => new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: folderName,
        resource_type: resourseType
    }
})

module.exports = storage;