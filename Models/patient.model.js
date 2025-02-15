import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  allergies: { type: Boolean,  default : false },
  chronicdiseases: {type: Boolean,  default : false },
  surgeries: { type: Boolean,  default : false },
  ongoingmedications: { type: Boolean,  default : false },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bloodpressure: { type: Number, required: true },
  averagepulse: { type: Number, required: true  },
  temperature: { type: Number, required: true },
  
},{timestamps : true});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
