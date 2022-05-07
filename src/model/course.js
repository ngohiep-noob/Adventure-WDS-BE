const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'You should add description for this course!'
    },
    views: {
      type: Number,
      default: 0  
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    thumbnail: {
        url: {
            type: String,
            default: 'https://i.pinimg.com/736x/89/4f/4b/894f4b2f803a5618a3c02795b361baa6.jpg'
        }, 
        id: {
            type: String, 
            default: ''
        }
    }, 
    pdf: {
        url: {
            type: String,
            default: ''
        }, 
        id: {
            type: String, 
            default: ''
        }
    }, 
    video: {
        url: {
            type: String,
            default: ''
        }, 
        id: {
            type: String, 
            default: ''
        }
    }
}, {collection: 'course', timestamps: true});

module.exports = mongoose.model('course', CourseSchema);