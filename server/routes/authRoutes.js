const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/send-otp", authController.sendOTP); // ✅ No ()
router.post("/verify-otp", authController.verifyOtp); // ✅ No ()

module.exports = router;
