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
            default: 'https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg='
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