const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getClientSecret,
  getListOfPaymentSources,
  chargeSavedPaymentMethod,
} = require("../controllers/payment");

router.route("/secret").get(protect, getClientSecret);
router.route("/saved-cards").get(protect, getListOfPaymentSources);
router.route("/charge-default-card").post(protect, chargeSavedPaymentMethod);

module.exports = router;
