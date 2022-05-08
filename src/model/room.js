const mongoose = require('mongoose')


const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        default: `Learning room ${Math.random(1000)}`
    }, 
    learningPath: {
        type: mongoose.Types.ObjectId,
        ref: 'LearningPath'
    },
    thumbnail: {
        id: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: 'https://media.istockphoto.com/photos/empty-japanese-classroom-picture-id488557342?b=1&k=20&m=488557342&s=170667a&w=0&h=reza-IZ-0UIIbPf40k5MGQZUtwDhV8EaGl-szjiVpdc='
        }
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'users', 
        default: []
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    chat: [{
        type: mongoose.Types.ObjectId,
        ref: 'chat',
        default: []
    }]
}, {collection: 'room', timestamps: true})

module.exports = mongoose.model('room', RoomSchema);