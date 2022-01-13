const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public

exports.createNotification = asyncHandler(async (req, res, next) => {
const userId = await User.findById(req.user.id);
const { type, title, description } = req.body;
const notification = await Notification.create({userId, type, title, description});

  res.status(200).json({
    success: {
      notification: notification
    },
  });

});


exports.markAsRead = asyncHandler(async (req, res, next) => {
const {notificationId} = req.params;
const update = { read: true };
const foundNotification = await Notification.findOneAndUpdate(notificationId, update);
const readNotification = await foundNotification.save()

  res.status(200).json({
    success: {
      notification: readNotification
    },
  });

});

exports.retrieveUsersNotifications = asyncHandler(async (req, res, next) => {
const userId = req.user.id;
const foundNotifications = await Notification.find({ userId: userId })

    if (!foundNotifications) {
    res.status(404);
    throw new Error("No notifications found");
  }

    res.status(200).json({
    success: {
      notifications: foundNotifications,
    },
  });

});

exports.retrieveUsersUnreadNotifications = asyncHandler(async (req, res, next) => {
const userId = req.user.id;
const foundNotifications =  await Notification.find({ userId: userId, read: false })

    if (!foundNotifications) {
    res.status(404);
    throw new Error("No notifications found");
  }

    res.status(200).json({
    success: {
      notifications: foundNotifications,
    },
  });


});