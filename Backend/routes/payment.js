import Razorpay from "razorpay"
import crypto from "crypto"
import express from "express"
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

console.log("RAZORPAY_KEY_ID",process.env.RAZORPAY_KEY_ID)

router.post('/create-order', async (req, res) => {
  const { amount, payer } = req.body;

  const options = {
    amount: amount * 100, // Razorpay uses paise
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: 'Error creating Razorpay order' });
  }
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    // ✅ Save success payment in MongoDB
    // await Payment.create({ ...req.body });
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'fail', reason: 'Invalid signature' });
  }
});

export default router;
