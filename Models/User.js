import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['patient', 'doctor'], default: 'patient' },
  });
  

  
  export default mongoose.model('User', userSchema);
  