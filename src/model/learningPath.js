const mongoose = require("mongoose");

const LearningPathSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    isProCourse: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
        default: [],
      },
    ],
    thumbnail: {
      url: {
        type: String,
        default:
          "https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg=",
      },
      id: {
        type: String,
        default: "",
      },
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
        default: [],
      },
    ],
  },
  { collection: "learing-path", timestamps: true }
);

module.exports = mongoose.model("LearningPath", LearningPathSchema);
