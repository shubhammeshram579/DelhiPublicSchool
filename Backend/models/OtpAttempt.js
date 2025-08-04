import mongoose from "mongoose";

const otpAttemptSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  attempts: { type: Number, default: 0 },
  blockedUntil: { type: Date, default: null },
});

export default mongoose.model("OtpAttempt", otpAttemptSchema);
