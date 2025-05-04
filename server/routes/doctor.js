// routes/doctor.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Use your authentication middleware
const doctorController = require('../controllers/doctorController'); // Create this file

// GET /api/doctor/dashboard
router.get('/dashboard', authMiddleware, doctorController.getDoctorDashboard);

router.get('/search', doctorController.searchDoctors);

module.exports = router;