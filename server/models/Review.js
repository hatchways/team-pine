const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Must include a rating"],
    min: [1, "Rating must be between 1 and 5"],
    max: [5, "Rating must be between 1 and 5"],
  },
  text: {
    type: String,
    default: "",
    maxlength: [2000, "Review must be 2000 characters or less"],
  }
},
{ timestamps: true });

module.exports = Review = mongoose.model("Review", reviewSchema);