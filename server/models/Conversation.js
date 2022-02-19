const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Message',
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model(
  'Conversation',
  conversationSchema
);
