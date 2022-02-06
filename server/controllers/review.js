const Review = require("../models/Review");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

// @route POST /reviews/:profileId
// @desc create review for a single profile
// @access Public

exports.createReview = asyncHandler(async (req, res, next) => {
  const reviewer = await Profile.findOne({ userId: req.user.id });
  if (reviewer.isSitter) {
    res.status(403);
    throw new Error("You are not authorized to perform this operation");
  }

  const profile = await Profile.findById(req.params.profileId).populate("reviews");

  if (!profile) {
    res.status(404);
    throw new Error("Profile does not exist");
  }
  if (!profile.isSitter) {
    res.status(400);
    throw new Error("Invalid profile type");
  }
  for (let review of profile.reviews) {
    if (review.reviewer.toString() == reviewer._id.toString()) {
      res.status(403);
      throw new Error("You are not authorized to perform this operation");
    }
  }

  const { rating, text } = req.body;
  const review = await Review.create({ reviewer, rating, text });

  if (review) {
    profile.reviews.push(review);
    profile.save();
    res.status(200).json({
      success: {
        review
      }
    });
  } else {
    res.status(404);
    throw new Error("Review does not exist");
  }
});

// @route GET /reviews/:profileId
// @desc get reviews for a profile
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId).populate({ path: "reviews", populate: "reviewer"});

  if (!profile) {
    res.status(404);
    throw new Error("Profile does not exist");
  }

  res.status(200).json({
    success: {
      reviews: profile.reviews
  }});
});