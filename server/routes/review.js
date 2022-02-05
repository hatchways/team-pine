const express = require("express");
const router = express.Router();
const { validateReview } = require("../validate");
const protect = require("../middleware/auth");
const {
  createReview,
  getReviews,
} = require("../controllers/review");

router.route("/:profileId").post(protect, validateReview, createReview);

router.route("/:profileId").get(protect, getReviews);

module.exports = router;