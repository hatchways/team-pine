const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  retrieveUsersNotifications,
  retrieveUsersUnreadNotifications,
  createNotification,
  markAsRead,
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);
router.route("/all").get(protect, retrieveUsersNotifications);
router.route("/unread").get(protect, retrieveUsersUnreadNotifications);
router.route("/mark-read/:notificationId").patch(protect, markAsRead);

module.exports = router;
