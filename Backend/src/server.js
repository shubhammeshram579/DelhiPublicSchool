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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", otpRoutes);
app.use("/api", members);
app.use("/api", formRoutes);
app.use("/api/payment", payment);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
