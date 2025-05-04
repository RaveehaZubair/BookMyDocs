import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ appointmentDetails, amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        onError(error.message);
        setProcessing(false);
        return;
      }

      // Send token to backend for payment processing
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.id,
          amount,
          appointmentDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(); // Handle success callback
      } else {
        onError('Payment failed: ' + data.message);
      }
    } catch (error) {
      onError('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-blue-700 mb-1">Card Details</label>
        <CardElement className="w-full p-2 border border-blue-300 rounded-lg" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
