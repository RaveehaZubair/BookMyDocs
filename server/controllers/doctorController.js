// server/controllers/doctorController.js
const Doctor = require('../models/doctor');
const User = require('../models/User'); // Import your User model
const Appointment = require('../models/Appointment');

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
    xports.getDoctorDashboard = async (req, res) => {
      try {
        // Use the authMiddleware to get the doctor's ID from the request
        const doctorId = req.user.id;
    
        // Find the doctor's information (excluding the password for security)
        const doctor = await User.findById(doctorId).select('-password');
    
        if (!doctor || doctor.role !== 'doctor') {
          return res.status(404).json({ message: 'Doctor not found' }); // Handle the case where the user is not a doctor
        }
        // Find the doctor's upcoming appointments
        const appointments = await Appointment.find({ doctor: doctorId })
          .populate('patient', 'name'); // Populate patient name in the appointments
        res.json({ doctor, appointments });
      } catch (err) {
        console.error('Error fetching doctor dashboard data:', err);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    exports.searchDoctors = async (req, res) => {
      try {
        const { specialization, availability, role } = req.query;
    
        let query = { role: 'doctor' }; // sirf doctors search hon
    
        // specialization filter
        if (specialization) {
          query.specialization = { $regex: specialization, $options: 'i' }; // case-insensitive
        }
    
        // ✅ availability filter yahan add karo
        if (availability && availability !== '') {
          query.availability = availability;
        }
    
        const doctors = await User.find(query);
        res.status(200).json(doctors); // result wapas bhejna
      } catch (error) {
        console.error('Error searching doctors:', error);
        res.status(500).json({ message: 'Server error while searching doctors' });
      }
    };  

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
