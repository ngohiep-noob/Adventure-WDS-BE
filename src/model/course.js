const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "You should add description for this course!",
    },
    views: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    thumbnail: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/viet-nam-national-university-ho-chi-my-city/image/upload/c_scale,h_200,w_350/v1652105774/flying-color-books-on-pastel-yellow-background-picture-id1304915362_ulbmw0.jpg",
      },
      id: {
        type: String,
        default: "",
      },
    },
    pdf: [{
      url: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        default: ""
      }
    }],
    videos: [
      {
        url: {
          type: String,
          default: "",
        },
        id: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "Undefined name"
        }
      },
      { default: [] },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  },
  { collection: "course", timestamps: true }
);

module.exports = mongoose.model("course", CourseSchema);
