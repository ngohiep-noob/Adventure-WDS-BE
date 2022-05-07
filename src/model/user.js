const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        }, 
        role: {
            isTeacher: {
                type: Boolean,
                default: false
            }, 
            isProUser: {
                type: Boolean,
                default: false
            }
        },
        refreshToken: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            min: 5,
            require: true,
        }, 
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }], 
        rooms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room'
        }]
    }, 
    {collection: 'users', timestamps: true}
)

module.exports = mongoose.model("users", UserSchema)
