import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: true 
  },
  patientEmail: { 
    type: String, 
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'] // Email validation regex
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', // Reference to the Doctor model
    required: true 
  },
  doctorName: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date,  // Date type for easier comparison and formatting
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    default: "Booked", 
    enum: ['Booked', 'Cancelled', 'Completed'] // Status of the appointment
  },
  paymentStatus: { 
    type: String, 
    default: 'Pending', // Default status for payment until confirmed
    enum: ['Pending', 'Confirmed', 'Failed'] // Payment status options
  }
});

// Export the model
export default mongoose.model("Appointment", appointmentSchema);
