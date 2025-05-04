import express from 'express';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctors.js';
import generateVerificationToken from '../services/generateVerificationToken.js';
import sendVerificationEmail from '../services/sendVerificationEmail.js';

const router = express.Router();

// Book an appointment
router.post('/book', async (req, res) => {
  try {
    const { patientName, patientEmail, doctorId, date, time } = req.body;

    // Validate required fields
    if (!patientName || !patientEmail || !doctorId || !date || !time) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check if doctorId is valid
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: 'Invalid Doctor ID' });
    }

    // Check if date is in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for comparison

    if (selectedDate < today) {
      return res.status(400).json({ message: 'Cannot book an appointment in the past.' });
    }

    // Find doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Save appointment
    const newAppointment = new Appointment({
      patientName,
      patientEmail,
      doctorId,
      doctorName: doctor.name,
      date: selectedDate,
      time,
      status: 'Booked',
    });

    await newAppointment.save();

    // Send verification email
    const token = generateVerificationToken();
    await sendVerificationEmail(patientEmail, token);

    res.status(201).json({
      message: 'Appointment booked and verification email sent!',
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
});

// Cancel appointment
router.delete('/cancel/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
});

// Reschedule appointment
router.put('/reschedule/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Optional: Add check for future date if needed
    const newDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date && newDate < today) {
      return res.status(400).json({ message: 'Cannot reschedule to a past date.' });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.status = 'Rescheduled';

    await appointment.save();

    res.json({ message: 'Appointment rescheduled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling appointment', error: error.message });
  }
});

export default router;
