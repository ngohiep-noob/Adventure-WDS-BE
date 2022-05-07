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
    courses: [{ type: mongoose.Types.ObjectId, ref: "course" }],
    thumbnail: {
      url: {
        type: String,
        default: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      id: {
        type: String,
        default: "",
      },
    },
  },
  { collection: "learing-path", timestamps: true }
);

module.exports = mongoose.model("LearningPath", LearningPathSchema);
