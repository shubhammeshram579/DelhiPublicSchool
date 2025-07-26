// routes/memberRoutes.js
import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

router.get("/members", async (req, res) => {
  try {
    const members = await Member.find();

    // console.log(members)
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
