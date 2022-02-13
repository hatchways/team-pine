const jwt = require("jsonwebtoken");

const generateToken = (id, expireTime = null) => {
  const expiresIn = expireTime ? expireTime : "7d";
  jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn
    }
  );
}

module.exports = generateToken;
