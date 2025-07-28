const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String }, // temporary OTP
  otpExpires: { type: Date }, // when OTP expires
  isVerified: { type: Boolean, default: false },
  password: {
    type: String,
    required: false, // because not set during initial OTP
  },
});

module.exports = mongoose.model("User", userSchema);
