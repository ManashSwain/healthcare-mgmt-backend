import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  specialization: { type: String, required: true }, // Example: "Cardiologist", "Dermatologist"
  experience: { type: Number, required: true }, // Years of experience
  qualifications: [String], // Example: ["MBBS", "MD"]
  hospital: { type: String, required: true },
}, {timestamps : true});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
