const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      default: "",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    messages: {
      type: [messageSchema],
      minLength: [1, "Must include at least one message"],
    },
    participants: [
      {
        sender: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      {
        reciever: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
