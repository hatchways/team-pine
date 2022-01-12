const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

// add these controllers when this ticket is finished

// const {
//   retrieveUsersNotifications,
//   retrieveUsersUnreadNotifications,
//    createNotification,
//    markAsRead
// } = require('../controllers/notification');

// router.route('/retrieveUsersNotifications').get(protect, retrieveUsersNotifications);

// router.route('/retrieveUsersUnreadNotifications').get(protect, retrieveUsersUnreadNotifications);

// router.route('/createNotification').post(protect, createNotification);

// router.route('/markAsRead').put(protect, markAsRead);


module.exports = router;