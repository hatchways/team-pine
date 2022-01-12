const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user_id: { type: String, max: 50, required: true },
  sitter_id: { type: String, max: 50, required: true },
  pet_ids: { type: [String], max: 50, required: true },
  start_date: {
    type: Date,
    validate: {
		validator: function(startDate) { return startDate < this.end_date },
		message: 'Start date must begin before the end date.'
    },
	required: [true, 'Must have a start date.']
  },
  end_date: {
    type: Date,
    validate: {
		validator: function(endDate) { return this.start_date < endDate },
		message: 'Start date must begin before the end date.'
    },
	required: [true, 'Must have an end date.']
  },
  accepted: { type: Boolean, default: False },
  declined: { type: Boolean, default: False },
  paid: { type: Boolean, default: False }
});

module.exports = Request = mongoose.model("Request", requestSchema);