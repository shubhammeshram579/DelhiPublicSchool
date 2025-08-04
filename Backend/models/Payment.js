import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: { type: String, default: 'INR' },
  payer: {
    name: String,
    email: String,
    mobile: String,
  },
  status: { type: String, default: 'success' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', paymentSchema);
