import express from 'express';
import stripePackage from 'stripe';
import Appointment from '../models/Appointment.js';

const stripe = stripePackage('your-secret-key-here'); // Replace with your actual Stripe secret key

const router = express.Router();

// Handle payment
router.post('/payment', async (req, res) => {
  try {
    const { token, amount, appointmentDetails } = req.body;

    // Create the payment with Stripe
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token,
      description: `Payment for appointment with ${appointmentDetails.doctorName}`,
    });

    // If payment succeeds, store appointment in the database
    if (charge.status === 'succeeded') {
      const newAppointment = new Appointment({
        doctorName: appointmentDetails.doctorName,
        patientName: appointmentDetails.patientName,
        date: appointmentDetails.date,
        time: appointmentDetails.time,
        paymentStatus: 'confirmed',
      });

      await newAppointment.save();

      res.json({ success: true, message: 'Payment successful and appointment booked!' });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
