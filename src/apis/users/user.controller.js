const UserService = require('./user.service')
const createError = require("http-errors")

module.exports = {
    async StoreUserInfo(req, res, next) {
        try {
            const DTO = await UserService.StoreUserInfo(req.body.userInfo);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    }
}