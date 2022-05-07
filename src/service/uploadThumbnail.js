const createHttpError = require('http-errors');
const Cloudinary = require('../config/cloudinary.config')

module.exports = {
    StoreThumbToDB: async(model, id, filePath) => {
        try {
            const uploadRes = await Cloudinary.uploader.upload(filePath);
    
            await model.updateOne({_id: id}, {
                thumbnail: {
                    url: uploadRes.secure_url,
                    id: uploadRes.public_id
                }
            })
    
            return {
                url: uploadRes.secure_url,
                id: uploadRes.public_id
            }
        } catch (error) {
            throw new createHttpError(500, error.message);
        }
    }   
}