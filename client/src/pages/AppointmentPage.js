import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentId, setAppointmentId] = useState(null);
  const [isReschedule, setIsReschedule] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  useEffect(() => {
    if (!doctorId) {
      alert('Doctor ID is invalid!');
      return;
    }

    const fetchDoctor = async () => {
      try {
        const fetchUrl = `http://localhost:5000/api/doctors/${doctorId}`;
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`Doctor not found: ${res.status}`);
        const data = await res.json();
        if (!data || !data.name || !data.email) {
          alert('Doctor not found');
          return;
        }
        setDoctorName(data.name);
      } catch (error) {
        alert('Error fetching doctor: ' + error.message);
      }
    };

    const storedAppointmentId = localStorage.getItem('appointmentId');
    if (storedAppointmentId) {
      setAppointmentId(storedAppointmentId);
      setIsReschedule(true);

      const fetchAppointment = async () => {
        try {
          const appointmentRes = await fetch(`http://localhost:5000/api/appointments/${storedAppointmentId}`);
          if (!appointmentRes.ok) throw new Error('Appointment Not Found');
          const appointmentData = await appointmentRes.json();
          setPatientName(appointmentData.patientName);
          setPatientEmail(appointmentData.patientEmail);
          setDate(appointmentData.date);
          setTime(appointmentData.time);
        } catch (error) {
          alert('Error fetching appointment details: ' + error.message);
          localStorage.removeItem('appointmentId');
          navigate(`/book-appointment/${doctorId}`);
        }
      };

      fetchAppointment();
    }

    fetchDoctor();
  }, [doctorId, navigate]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('You cannot book an appointment for a past date.');
      setDate('');
      return;
    }
    if (selectedDate.getDay() === 0) {
      alert('Appointments cannot be booked on Sundays.');
      setDate('');
      return;
    }
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today || selectedDate.getDay() === 0) {
      alert('Invalid date selection.');
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 8 || hours > 19 || (hours === 19 && minutes > 0)) {
      alert('Appointment time must be between 08:00 and 19:00.');
      return;
    }

    const appointmentData = {
      patientName,
      patientEmail,
      doctorId,
      date,
      time,
    };

    // Validate email
    if (!patientEmail.includes('@') || !patientEmail.endsWith('.com')) {
      alert('Email must end with ".com".');
      return;
    }

    try {
      let response;

      if (isReschedule && appointmentId) {
        response = await fetch(`http://localhost:5000/api/appointments/reschedule/${appointmentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, time }),
        });
      } else {
        response = await fetch('http://localhost:5000/api/appointments/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointmentData),
        });
      }

      const data = await response.json();
      if (response.ok) {
        const successText = isReschedule
          ? 'Appointment rescheduled successfully!'
          : 'Appointment booked successfully!';
        setSuccessMessage(successText); // Set success message
        setTimeout(() => {
          setSuccessMessage('');
          localStorage.removeItem('appointmentId');
          navigate('/'); // Redirect to homepage after success
        }, 2500); // Hide after 2.5s and navigate
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancel = async () => {
    if (!appointmentId) return;

    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/cancel/${appointmentId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment cancelled successfully!');
        localStorage.removeItem('appointmentId');
        navigate('/'); // Navigate to home page after cancellation
      } else {
        alert('Error cancelling appointment: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          {isReschedule ? 'Reschedule Appointment' : 'Book an Appointment'}
        </h2>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center bg-green-100 border border-green-300 p-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Patient Email</label>
            <input
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Doctor</label>
            <input
              type="text"
              value={doctorName}
              readOnly
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
          >
            {isReschedule ? 'Reschedule Appointment' : 'Book Appointment'}
          </button>
          {isReschedule && (
            <button
              type="button"
              className="w-full mt-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-700"
              onClick={handleCancel}
            >
              Cancel Appointment
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
