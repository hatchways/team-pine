const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true
  },
  description: {
    type: String,
    maxLength: 200,
    required: true
  }
})

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  sitter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  petIds: {
    // See petSchema above this schema for more details
    type: [petSchema],
    maxLength: 30,
    minLength: [1, 'Must include at least one pet in a request']
  },
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
  status: { type: String, default: 'pending', enum: ['accepted', 'declined', 'pending', 'completed'] },
  paid: { type: Boolean, default: False }
},
{ timestamps: true });

module.exports = Request = mongoose.model("Request", requestSchema);