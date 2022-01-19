const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  getAllMessages,
  sendMessage,
  getAllConversations,
} = require("../controllers/conversation");

router.route("/create-conversation").post(protect, createConversation);
router.route("/message").post(protect, sendMessage);
router.route("/:conversationId/messages").get(protect, getAllMessages);
router.route("/all").get(protect, getAllConversations);

module.exports = router;
