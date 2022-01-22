const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(401).send("Profile is not exists!!");
    }

    req.profile = profile;

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protect;
