const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateScheduleSchema } = require("../validate");
const {
  getActiveSchedule,
  getAvailability,
  setActiveSchedule,
  getSchedule,
  createSchedule,
} = require("../controllers/availability");

router.route("/").get(protect, getAvailability);

router.route("/").post(protect, validateScheduleSchema, createSchedule);

router.route("/active").get(protect, getActiveSchedule);

router.route("/:scheduleId").get(protect, getSchedule);

router.route("/:scheduleId/activate").patch(protect, setActiveSchedule);

module.exports = router;
