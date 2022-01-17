const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /notifications/
// @desc create a new notification
// @access Public

exports.createNotification = asyncHandler(async (req, res, next) => {
  const { type, title, description, receiver } = req.body;
  
  if (!type || !title || !description || !receiver){
    res.status(400);
    throw new Error("Bad request! Missing type, title, description or receiver!");
  }

  const notification = await Notification.create({
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

// @route PATCH /notifications/:notificationId/mark-read/
// @desc changes mark as read property to true on a notification
// @access Private

exports.markAsRead = asyncHandler(async (req, res, next) => {
  const { notificationId } = req.params;
  const foundNotification = await Notification.findById(notificationId);

  if (foundNotification.user.toString() !== req.receiver.id) {
    res.status(403);
    throw new Error("The user doesn't have the correct privileges or permissions to modify this notification");
  }

  foundNotification.read = true;

  await foundNotification.save();

  res.status(200).json({
    success: {
      notification: foundNotification,
    },
  });
});

// @route GET /notifications/all
// @desc Retrieves all notifications for a user
// @access Private

exports.retrieveUsersNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const foundNotifications = await Notification.find({ receiver: userId });

  res.status(200).json({
    success: {
      notifications: foundNotifications,
    },
  });
});

// @route GET /notifications/unread
// @desc Retrieves all unread notifications for a user
// @access Private

exports.retrieveUsersUnreadNotifications = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const foundNotifications = await Notification.find({
      receiver: userId,
      read: false,
    });

    res.status(200).json({
      success: {
        notifications: foundNotifications,
      },
    });
  }
);
