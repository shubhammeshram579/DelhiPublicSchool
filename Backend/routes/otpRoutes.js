import express from "express";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import OtpAttempt from "../models/OtpAttempt.js";
import { generateToken } from "../utils/jwt.js";
const router = express.Router();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  const otpCode = generateOTP();

  await Otp.create({ mobile, otp: otpCode });

  console.log(`Generated OTP for ${mobile}: ${otpCode}`);

  res.json({ success: true, message: "OTP sent successfully",otp: otpCode });
});


const BLOCK_DURATION_MINUTES = 2;
const MAX_ATTEMPTS = 3;

router.post("/verify-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  // Step 1: Check block status
  const attempt = await OtpAttempt.findOne({ mobile });

  if (attempt && attempt.blockedUntil && new Date() < attempt.blockedUntil) {
    return res.status(403).json({
      success: false,
      message: `Too many wrong attempts. Try again after ${attempt.blockedUntil.toLocaleTimeString()}`,
    });
  }

  // Step 2: Check OTP
  const validOtp = await Otp.findOne({ mobile, otp });

  if (validOtp) {
    await Otp.deleteMany({ mobile });
    await OtpAttempt.deleteOne({ mobile }); // Clear failed attempts on success

    let user = await User.findOne({ mobile });
    if (!user) user = await User.create({ mobile });

    const token = generateToken(user);
    return res.json({
      success: true,
      message: "OTP Verified, User Registered/Login Successful",
      user: { id: user._id, mobile: user.mobile },
      token,
    });
  } else {
    // Step 3: Record failed attempt
    if (!attempt) {
      await OtpAttempt.create({ mobile, attempts: 1 });
    } else {
      attempt.attempts += 1;

      if (attempt.attempts >= MAX_ATTEMPTS) {
        attempt.blockedUntil = new Date(Date.now() + BLOCK_DURATION_MINUTES * 60000);
        attempt.attempts = 0; // reset after block
      }

      await attempt.save();
    }

    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});


export default router;
