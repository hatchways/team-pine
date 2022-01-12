const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['request', 'payment', 'message'],
    required: true
  },
  title: {
    type: String,
    default: "",
    required: true
  },
  description: {
    type: String,
    default: "",
        required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => Date.now() + 7*24*60*60*1000
  },
  read: {
    type: Boolean,
    default: false,
    required: true
}
});

module.exports = Notification = mongoose.model("Notification", notificationSchema);
