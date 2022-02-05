const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createReview,
  getReviews,
} = require("../controllers/review");

router.route("/:profileId").post(protect, createReview);

router.route("/:profileId").get(protect, getReviews);

module.exports = router;