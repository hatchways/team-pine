const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  sitter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  startDate: {
    type: Date,
    validate: {
      validator: function(startDate) { return startDate < this.endDate },
      message: 'Start date must begin before the end date.'
    },
    required: [true, 'Must have a start date.']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(endDate) { return this.startDate < endDate },
      message: 'Start date must begin before the end date.'
    },
    required: [true, 'Must have an end date.']
  },
  status: { type: String, default: 'pending', trim: true, enum: ['accepted', 'declined', 'pending', 'completed'] },
  paid: { type: Boolean, default: false }
},
{ timestamps: true });

module.exports = Request = mongoose.model("Request", requestSchema);