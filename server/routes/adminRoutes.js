// const express = require('express');
// const router = express.Router();

// // Import controllers
// const doctorController = require('../controllers/doctorController');
// const patientController = require('../controllers/patientController');
// const appointmentController = require('../controllers/appointmentController');
// const adminController = require('../controllers/adminController');

// // Routes
// router.get('/doctors', doctorController.getDoctors);
// router.get('/patients', patientController.getPatients);
// router.get('/appointments', appointmentController.getAppointments);

// // ✅ NEW route to send reminder
// router.post('/appointments/:id/send-reminder', adminController.sendAppointmentReminder);

// // ✅ NEW route for analytics dashboard
// router.get('/analytics', adminController.getAnalyticsDashboard);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import controllers
const doctorController = require('../controllers/doctorController');
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
const adminController = require('../controllers/adminController');

// Routes
router.get('/doctors', doctorController.getDoctors);
router.get('/patients', patientController.getPatients);
router.get('/appointments', appointmentController.getAppointments);

// ✅ Route to send reminder
router.post('/appointments/:id/send-reminder', adminController.sendAppointmentReminder);

// ✅ Route for analytics dashboard
router.get('/analytics', adminController.getAnalyticsDashboard);

// ✅ NEW route to update attendance status
router.put('/appointments/:id/attendance', adminController.updateAppointmentAttendance);

module.exports = router;
