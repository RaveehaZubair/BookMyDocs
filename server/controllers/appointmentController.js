// controllers/appointmentController.js

const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalAppointments = await Appointment.countDocuments();

    if (totalAppointments === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    const appointments = await Appointment.find()
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(totalAppointments / limit),
      totalAppointments,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ message: 'Server error, unable to fetch appointments.' });
  }
};
