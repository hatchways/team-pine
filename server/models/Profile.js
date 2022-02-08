const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  aboutMe: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "none",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null,
  },
  photo: {
    type: String,
    default: "",
  },
  isSitter: {
    type: Boolean,
    default: false,
  },
  payRate: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
    lowercase: true,
    trim: true,
  },
  activeSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
