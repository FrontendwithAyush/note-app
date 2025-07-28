const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/send-otp", authController.sendOTP); // ✅ No ()
router.post("/verify-otp", authController.verifyOtp); // ✅ No ()
const { createPassword } = require("../controllers/authController");
router.post("/create-password", createPassword);
const { login } = require("../controllers/authController");
router.post("/login", login);

module.exports = router;
