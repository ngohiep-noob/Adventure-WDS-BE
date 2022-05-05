const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        }, 
        email: {
            type: String,
            require: true,
            unique: true
        },
        user_id: {
            type: String,
            require: true,
            unique: true
        }
    }, 
    {collection: 'users', timestamps: true}
)

module.exports = mongoose.model("users", UserSchema)
