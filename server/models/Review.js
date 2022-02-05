const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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