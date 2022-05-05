const createHttpError = require('http-errors');
const firebaseAdmin = require('../../config/firebase-config')

module.exports = {
    async DecodeToken(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        try {
            const decodeToken = await firebaseAdmin.auth().verifyIdToken(token);
            req.body.userInfo = decodeToken;
            next()
        } catch (error) {
            createHttpError(500, "Cannot verify access token!")
        }
    }
};