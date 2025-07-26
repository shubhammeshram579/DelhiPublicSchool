import mongoose from "mongoose";

const formEntrySchema = new mongoose.Schema({
  type: String, 
  firstName: String,
  mobile: String,
  relation: String,
  gender: String,
  aadhaar: String,
  dob: String,
  email: String,
});

export default mongoose.model("FormEntry", formEntrySchema);
