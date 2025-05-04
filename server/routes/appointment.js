const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const appointmentController = require('../controllers/appointmentController');

// POST /api/appointments/create (to book an appointment)
router.post('/create', authMiddleware, appointmentController.createAppointment);

// GET /api/appointments (to list all appointments for the logged-in user)
router.get('/', authMiddleware, appointmentController.getAppointments);

// GET /api/appointments/:id (to get details of a specific appointment)
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

module.exports = router;
