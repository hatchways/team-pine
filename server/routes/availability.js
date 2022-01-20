const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateScheduleSchema } = require("../validate");
const fetchProfile = require("../middleware/fetchProfile");
const {
  getActiveSchedule,
  getAvailability,
  setActiveSchedule,
  getSchedule,
  createSchedule,
} = require("../controllers/availability");

router.route("/").get(protect, fetchProfile, getAvailability);

router
  .route("/")
  .post(protect, fetchProfile, validateScheduleSchema, createSchedule);

router.route("/active").get(protect, fetchProfile, getActiveSchedule);

router.route("/:scheduleId").get(protect, fetchProfile, getSchedule);

router
  .route("/:scheduleId/activate")
  .patch(protect, fetchProfile, setActiveSchedule);

module.exports = router;
