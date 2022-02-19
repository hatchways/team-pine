const mongoose = require('mongoose');

const daySchedule = new mongoose.Schema({
  isAvailable: {
    type: Boolean,
    default: false,
  },
  start: {
    type: Number,
    min: 0,
    max: 23,
    required: function () {
      return this.isAvailable;
    },
  },
  end: {
    type: Number,
    min: 0,
    max: 23,
    required: function () {
      return this.isAvailable;
    },
  },
});

const scheduleSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',
  },
  name: {
    type: String,
    default: '',
  },
  days: {
    sunday: daySchedule,
    monday: daySchedule,
    tuesday: daySchedule,
    wednesday: daySchedule,
    thursday: daySchedule,
    friday: daySchedule,
    saturday: daySchedule,
  },
});

const ScheduleDayEndValidator = function (value) {
  return value > this.start;
};

daySchedule
  .path('end')
  .validate(ScheduleDayEndValidator, 'End date should be after start date');

module.exports = Schedule = mongoose.model('Schedule', scheduleSchema);
