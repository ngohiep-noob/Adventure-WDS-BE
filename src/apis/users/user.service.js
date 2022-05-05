const createHttpError = require('http-errors')
const User = require('../../model/user.js')

module.exports = {
    async StoreUserInfo(data) {
        try {
            const {user_id, email, name} = data;
            const isExistUser = await User.findOne({user_id});

            let resDB;
            if(!isExistUser) {
                resDB = await User.create({user_id, email, username: name})
                console.log(resDB)
            }
            return {
                statusCode: 201,
                UserInfo: resDB || "User has already existed!"
            }
        } catch (error) {
            throw new createHttpError(500, error.message)
        }
    }
}