const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// GET /api/patient/dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const patient = await User.findById(req.user.id);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const appointments = await Appointment.find({ patientId: req.user.id });

    res.json({ patient, appointments });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
