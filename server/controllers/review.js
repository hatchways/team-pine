const Review = require('../models/Review');
const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// @route POST /reviews
// @desc create review for a single profile
// @access Public

exports.createReview = asyncHandler(async (req, res, next) => {
  const reviewer = await Profile.findOne({ userId: req.user.id });
  if (reviewer.isSitter) {
    res.status(403);
    throw new Error('You are not authorized to perform this operation');
  }

  const profile = await Profile.findById(req.body.profileId);

  if (!profile) {
    res.status(404);
    throw new Error('Profile does not exist');
  }
  if (!profile.isSitter) {
    res.status(400);
    throw new Error('Invalid profile type');
  }

  const { rating, text } = req.body;
  const review = await Review.create({
    reviewee: profile,
    reviewer,
    rating,
    text,
  });

  res.status(200).json({
    success: {
      review,
    },
  });
});

// @route GET /reviews/:profileId
// @desc get reviews for a profile
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.where(req.params.profileId).populate('reviewer');

  let ratingTotal = 0;
  for (let review of reviews) {
    ratingTotal += review.rating;
  }

  const rating = Math.round((ratingTotal / count) * 2) / 2;

  res.status(200).json({
    success: {
      reviews,
      rating,
    },
  });
});
