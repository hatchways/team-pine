const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    default: "",
  }
});

module.exports = Review = mongoose.model("Review", reviewSchema);