import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // A component handling Stripe payment

// Initialize Stripe with your public key
const stripePromise = loadStripe('your-public-key-here');

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [paymentError, setPaymentError] = useState('');

  const appointmentDetails = location.state?.appointmentDetails || {};

  const handlePaymentSuccess = async () => {
    // Store the appointment in the database after successful payment
    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...appointmentDetails,
        paymentStatus: 'confirmed',
      }),
    });

    const data = await response.json();
    if (data.success) {
      navigate('/appointment-confirmation');
    } else {
      setPaymentError('Failed to store appointment in the database.');
    }
  };

  const handlePaymentFailure = (error) => {
    setPaymentError(error);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Payment for Appointment
        </h2>

        {/* Display error message if any */}
        {paymentError && (
          <div className="mb-4 text-red-600 font-semibold text-center bg-red-100 border border-red-300 p-3 rounded-lg">
            {paymentError}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold">Appointment Details</h3>
          <p className="mb-2">Doctor: {appointmentDetails.doctorName}</p>
          <p className="mb-2">Patient: {appointmentDetails.patientName}</p>
          <p className="mb-2">Date: {appointmentDetails.date}</p>
          <p className="mb-4">Time: {appointmentDetails.time}</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            appointmentDetails={appointmentDetails}
            amount={1000}  // Default amount to be paid (10 USD)
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentFailure}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
