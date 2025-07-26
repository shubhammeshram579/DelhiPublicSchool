import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import otpRoutes from "../routes/otpRoutes.js";
import members from "../routes/members.js";
import formRoutes from "../routes/formRoutes.js";
import payment from "../routes/payment.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI_CLOUD)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  const connectDB = async () => {
  let retries = 5;

  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected successfully');
      break;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      retries -= 1;
      console.log(`🔄 Retrying in 5 seconds... (${retries} attempts left)`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  if (!retries) {
    console.error('🚫 Failed to connect to MongoDB after all retries.');
    process.exit(1);
  }
};

connectDB()


app.use("/api", otpRoutes);
app.use("/api", members);
app.use("/api", formRoutes);
app.use("/api/payment", payment);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
