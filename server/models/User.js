const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  specialization: { type: String }, // Add specialization field (optional)
  experience: { type: Number },
  availability: { type: String, enum: ['Available', 'Not Available'] }    
});

// Prevent model overwrite errors in dev environments
module.exports = mongoose.models.User || mongoose.model('User', userSchema);