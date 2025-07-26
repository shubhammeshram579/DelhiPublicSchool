import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  mobile: String,
  name: String,
  aadhar: String,
  role: String,
  gender: String,
  dob: String
});

export default mongoose.model('Member', memberSchema);
