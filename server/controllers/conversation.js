const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");

// @route POST /
// @desc create a new conversation
// @access Public

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { description, receiver } = req.body;

  if (!description || !receiver) {
    res.status(400);
    throw new Error("Bad request! Missing description or receiver!");
  }

  const message = await Message.create({
    sender: req.user.id,
    description,
  });

  const existingConversation = await Conversation.findOne({
    participants: { $all: [`${req.user.id}`, `${receiver}`] },
  });

  if (existingConversation) {
    existingConversation.messages.push(message);

    await existingConversation.save();

    res.status(200).json({
      success: {
        conversation: existingConversation,
      },
    });
  } else {
    const conversation = await Conversation.create({
      participants: [req.user.id, receiver],
    });

    conversation.messages.push(message);

    await conversation.save();

    res.status(200).json({
      success: {
        conversation,
      },
    });
  }
});

// @route GET /message/:conversationId
// @desc get all messages from a single conversation
// @access Public

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;

  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    sort: { updatedAt: "desc" },
  });

  if (
    conversation.participants[0].toString() === req.user.id ||
    conversation.participants[1].toString() === req.user.id
  ) {
    res.status(200).json({
      success: {
        conversation,
      },
    });
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

// @route POST /message/
// @desc send a message to a conversation
// @access Private

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, description } = req.body;

  if (!description || !conversationId) {
    res.status(400);
    throw new Error("Bad request!");
  }

  const conversation = await Conversation.findById(conversationId);

  if (
    conversation.participants[0].toString() === req.user.id ||
    conversation.participants[1].toString() === req.user.id
  ) {
    const message = await Message.create({
      sender: req.user.id,
      description,
    });

    conversation.messages.push(message);

    await conversation.save();

    res.status(200).json({
      success: {
        conversation,
      },
    });
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

// @route GET /all/
// @desc get all conversations for a user
// @access Private

exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find({
    participants: { $in: req.user.id },
  })
    .populate({
      path: "messages",
      sort: { updatedAt: "desc" },
      populate: {
        path: "sender",
        model: "User",
      },
    })
    .populate("participants");

  res.status(200).json({
    success: {
      conversations,
    },
  });
});
