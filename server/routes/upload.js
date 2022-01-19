const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { uploadProfilePic } = require("../controllers/upload");

router.route("/profile-pic").post(protect, uploadProfilePic);

module.exports = router;
