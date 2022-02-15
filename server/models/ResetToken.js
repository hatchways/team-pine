const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800
  }
});

resetTokenSchema.methods.matchToken = async function (enteredToken) {
  return await bcrypt.compare(enteredToken, this.token);
};

resetTokenSchema.pre("create", async function () {
  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
});

module.exports = ResetToken = mongoose.model("ResetToken", resetTokenSchema);
