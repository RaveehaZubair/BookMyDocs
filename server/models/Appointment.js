// models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  patient_email: { type: String, required: true },
  doctor_name: { type: String, required: true },
  doctor_email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  attended: {
    type: Boolean,
    default: false
  },  
});

module.exports = mongoose.model('Appointment', appointmentSchema);
