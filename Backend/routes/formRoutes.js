import express from "express";
import FormEntry from "../models/FormEntry.js";

const router = express.Router();

router.post("/save-form", async (req, res) => {
  try {
    const entries = Object.entries(req.body); 

    const documents = entries.map(([type, data]) => ({
      type,
      ...data,
    }));

    await FormEntry.insertMany(documents);

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/people", async (req, res) => {
  try {
    const members = await FormEntry.find();

    // console.log(members)
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
