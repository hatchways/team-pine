const Conversation = require("../models/Conversation");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /create-conversation/
// @desc create a new conversation
// @access Public

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { description, receiver } = req.body;

  if (!description || !receiver) {
    res.status(400);
    throw new Error("Bad request! Missing description or receiver!");
  }

  const conversation = await Conversation.create({
    messages: {
      sender: req.user.id,
      receiver,
      description,
    },
    participants: [req.user.id, receiver],
  });

  res.status(200).json({
    success: {
      conversation: conversation,
    },
  });
});

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const { type, title, description, receiver } = req.body;

  if (!type || !title || !description || !receiver) {
    res.status(400);
    throw new Error(
      "Bad request! Missing type, title, description or receiver!"
    );
  }

  const notification = await Conversation.create({
    sender: req.user.id,
    receiver,
    type,
    title,
    description,
  });

  res.status(200).json({
    success: {
      notification: notification,
    },
  });
});

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, description, receiver } = req.body;

  if (!description || !receiver) {
    res.status(400);
    throw new Error("Bad request!");
  }

  const conversation = await Conversation.findById({ conversationId }).populate(
    "messages"
  );

  if (!conversation) {
    res.status(403);
    throw new Error("Conversation not found!");
  }

  conversation.messages.push({
    sender: req.user.id,
    receiver,
    description,
  });

  res.status(200).json({
    success: {
      conversation: notification,
    },
  });
});

exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const { type, title, description, receiver } = req.body;

  if (!type || !title || !description || !receiver) {
    res.status(400);
    throw new Error(
      "Bad request! Missing type, title, description or receiver!"
    );
  }

  const conversation = await Conversation.findById({ participants });

  res.status(200).json({
    success: {
      notification: notification,
    },
  });
});
