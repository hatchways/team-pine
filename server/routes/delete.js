const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { deleteProfilePic } = require("../controllers/delete");

router.route("/profile-pic").delete(protect, deleteProfilePic);

module.exports = router;
