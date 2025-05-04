// server/controllers/doctorController.js
const Doctor = require('../models/doctor');

// Fetch all doctors with pagination and error handling
exports.getDoctors = async (req, res) => {
  try {
    // Get page and limit from query, set default if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalDoctors = await Doctor.countDocuments();

    // Fetch paginated doctors
    const doctors = await Doctor.find().skip(skip).limit(limit);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalDoctors / limit),
      totalDoctors,
      data: doctors
    });

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error, unable to fetch doctors.' });
  }
};

// Additional CRUD operations...
