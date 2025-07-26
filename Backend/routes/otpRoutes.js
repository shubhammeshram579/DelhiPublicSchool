import express from "express";
import Otp from "../models/Otp.js";
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

router.post("/verify-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  const validOtp = await Otp.findOne({ mobile, otp });

  if (validOtp) {
    await Otp.deleteMany({ mobile }); // clear OTPs for mobile
    res.json({ success: true, message: "OTP Verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

export default router;
