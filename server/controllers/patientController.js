const Patient = require('../models/Patient');

exports.getPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPatients = await Patient.countDocuments();
    const patients = await Patient.find().skip(skip).limit(limit);

    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalPatients / limit),
      totalPatients,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server error, unable to fetch patients.' });
  }
};
