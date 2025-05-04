// require('dotenv').config();  // Load environment variables

// const Doctor = require('../models/doctor');
// const Patient = require('../models/Patient');
// const Appointment = require('../models/Appointment');
// const nodemailer = require('nodemailer');

// // Fetch all doctors
// const getDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.json(doctors);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Fetch all patients
// const getPatients = async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.json(patients);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Fetch all appointments (with pagination)
// const getAppointments = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const total = await Appointment.countDocuments();
//     const totalPages = Math.ceil(total / limit);

//     const appointments = await Appointment.find()
//       .skip((page - 1) * limit)
//       .limit(limit);

//     res.json({
//       data: appointments,
//       page,
//       totalPages
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Send reminder email for an appointment
// const sendAppointmentReminder = async (req, res) => {
//   const appointmentId = req.params.id;

//   try {
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) return res.status(404).json({ message: "Appointment not found" });

//     // Check if reminder has already been sent
//     if (appointment.reminderSent) {
//       return res.status(400).json({ message: "Reminder already sent" });
//     }

//     // Configure nodemailer with environment variables
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     // Prepare email content
//     const mailOptionsPatient = {
//       from: process.env.EMAIL_USER,
//       to: appointment.patient_email,
//       subject: 'Appointment Reminder',
//       text: `Dear ${appointment.patient_name},\n\nThis is a reminder for your appointment with Dr. ${appointment.doctor_name} on ${appointment.date} at ${appointment.time}.\n\nBest regards,\nClinic`
//     };

//     const mailOptionsDoctor = {
//       from: process.env.EMAIL_USER,
//       to: appointment.doctor_email,
//       subject: 'Appointment Reminder',
//       text: `Dear Dr. ${appointment.doctor_name},\n\nThis is a reminder for your appointment with ${appointment.patient_name} on ${appointment.date} at ${appointment.time}.\n\nBest regards,\nClinic`
//     };

//     await transporter.sendMail(mailOptionsPatient);
//     await transporter.sendMail(mailOptionsDoctor);

//     appointment.reminderSent = true;
//     await appointment.save();

//     res.status(200).json({ message: "Reminder sent successfully" });

//   } catch (error) {
//     console.error("Reminder error:", error);
//     res.status(500).json({ message: "Failed to send reminder", error });
//   }
// };

// const getAnalyticsDashboard = async (req, res) => {
//     try {
//       const appointmentsOverTime = await Appointment.aggregate([
//         {
//           $addFields: {
//             safeDate: {
//               $cond: {
//                 if: { $eq: [{ $type: "$date" }, "date"] },
//                 then: "$date",
//                 else: { $toDate: "$date" }
//               }
//             }
//           }
//         },
//         {
//           $group: {
//             _id: {
//               $dateToString: {
//                 format: "%Y-%m-%d",
//                 date: "$safeDate"
//               }
//             },
//             count: { $sum: 1 }
//           }
//         },
//         { $sort: { _id: 1 } }
//       ]);
  
//       const doctorActivityRaw = await Appointment.aggregate([
//         {
//           $group: {
//             _id: "$doctor_name",
//             appointments: { $sum: 1 }
//           }
//         }
//       ]);
  
//       // Rename fields for frontend compatibility
//       const doctorActivity = doctorActivityRaw.map(item => ({
//         doctor: item._id,
//         appointments: item.appointments
//       }));
  
//       const noShowStatsRaw = await Appointment.aggregate([
//         {
//           $group: {
//             _id: "$attended",
//             count: { $sum: 1 }
//           }
//         }
//       ]);
  
//       // Format attended field (true/false) into readable strings
//       const noShowStats = noShowStatsRaw.map(item => ({
//         status: item._id === true ? "Attended" : "No-Show",
//         count: item.count
//       }));
  
//       res.json({ appointmentsOverTime, doctorActivity, noShowStats });
//     } catch (err) {
//       console.error('Analytics error:', err);
//       res.status(500).json({ error: 'Failed to fetch analytics data' });
//     }
//   };

// // Export all controllers
// module.exports = {
//   getDoctors,
//   getPatients,
//   getAppointments,
//   sendAppointmentReminder,
//   getAnalyticsDashboard
// };


require('dotenv').config();  // Load environment variables

const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// Fetch all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all appointments (with pagination)
const getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Appointment.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const appointments = await Appointment.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: appointments,
      page,
      totalPages
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Send reminder email for an appointment
const sendAppointmentReminder = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.reminderSent) {
      return res.status(400).json({ message: "Reminder already sent" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptionsPatient = {
      from: process.env.EMAIL_USER,
      to: appointment.patient_email,
      subject: 'Appointment Reminder',
      text: `Dear ${appointment.patient_name},\n\nThis is a reminder for your appointment with Dr. ${appointment.doctor_name} on ${appointment.date} at ${appointment.time}.\n\nBest regards,\nClinic`
    };

    const mailOptionsDoctor = {
      from: process.env.EMAIL_USER,
      to: appointment.doctor_email,
      subject: 'Appointment Reminder',
      text: `Dear Dr. ${appointment.doctor_name},\n\nThis is a reminder for your appointment with ${appointment.patient_name} on ${appointment.date} at ${appointment.time}.\n\nBest regards,\nClinic`
    };

    await transporter.sendMail(mailOptionsPatient);
    await transporter.sendMail(mailOptionsDoctor);

    appointment.reminderSent = true;
    await appointment.save();

    res.status(200).json({ message: "Reminder sent successfully" });

  } catch (error) {
    console.error("Reminder error:", error);
    res.status(500).json({ message: "Failed to send reminder", error });
  }
};

// ✅ Update appointment attendance
const updateAppointmentAttendance = async (req, res) => {
  try {
    const { attended } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { attended },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Attendance updated", appointment });
  } catch (error) {
    console.error("Attendance update error:", error);
    res.status(500).json({ message: "Failed to update attendance", error });
  }
};

// ✅ Analytics dashboard
const getAnalyticsDashboard = async (req, res) => {
  try {
    const appointmentsOverTime = await Appointment.aggregate([
      {
        $addFields: {
          safeDate: {
            $cond: {
              if: { $eq: [{ $type: "$date" }, "date"] },
              then: "$date",
              else: { $toDate: "$date" }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$safeDate"
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const doctorActivityRaw = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctor_name",
          appointments: { $sum: 1 }
        }
      }
    ]);

    const doctorActivity = doctorActivityRaw.map(item => ({
      doctor: item._id,
      appointments: item.appointments
    }));

    const noShowStatsRaw = await Appointment.aggregate([
        {
          $addFields: {
            normalizedAttended: {
              $cond: [
                { $eq: ["$attended", true] },
                true,
                false
              ]
            }
          }
        },
        {
          $group: {
            _id: "$normalizedAttended",
            count: { $sum: 1 }
          }
        }
      ]);

    const noShowStats = noShowStatsRaw.map(item => ({
      status: item._id === true ? "Attended" : "Not-attended",
      count: item.count
    }));

    res.json({ appointmentsOverTime, doctorActivity, noShowStats });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
};

// Export all controllers
module.exports = {
  getDoctors,
  getPatients,
  getAppointments,
  sendAppointmentReminder,
  updateAppointmentAttendance,  // ✅ newly added
  getAnalyticsDashboard
};
