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

// @route GET /message/
// @desc get all messages from a single conversation
// @access Private

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.body;

  const conversation = await Conversation.findById(conversationId).populate(
    "messages"
  );

  if (conversation.length === 0) {
    res.status(403);
    throw new Error("No conversation found!");
  }

  res.status(200).json({
    success: {
      conversation: conversation,
    },
  });
});

// @route POST /message/
// @desc send a message to a conversation
// @access Private

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, description, receiver } = req.body;

  if (!description || !receiver) {
    res.status(400);
    throw new Error("Bad request!");
  }

  const conversation = await Conversation.findById({ conversationId });

  if (conversation.length === 0) {
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
      conversation: conversation,
    },
  });
});

// @route GET /all/
// @desc get all conversations for a user
// @access Private

exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find({
    participants: { $in: req.user.id },
  }).populate("messages");

  if (conversations.length === 0) {
    res.status(403);
    throw new Error("No conversations found!");
  }

  res.status(200).json({
    success: {
      conversations: conversations,
    },
  });
});
