const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  name: {
    type: String,
    default: "",
  },
  days: [
    {
      day: {
        type: Number,
        min: 1,
        max: 7,
        unique: true,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        default: false,
      },
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true,
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true,
      },
    },
  ],
});

const ScheduleDayEndValidator = function (value) {
  return value > this.startAt;
};

scheduleSchema
  .path("days.end")
  .validate(ScheduleDayEndValidator, "End date should be after start date");

module.exports = Schedule = mongoose.model("Schedule", scheduleSchema);
