const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  editProfile,
  loadProfile,
  getProfileListings,
} = require("../controllers/profile");

router.route("/edit").put(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/list-profiles").get(getProfileListings);

module.exports = router;
