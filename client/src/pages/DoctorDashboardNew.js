import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data.doctor);
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error('Error fetching doctor dashboard data:', err);
        // Handle error appropriately (e.g., display an error message to the user)
      }
    };

    fetchDoctorData();
  }, [token]);

  if (!doctor) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Doctor Dashboard</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-success">Welcome, {doctor.name}</h3>
          <p className="card-text">
            <strong>Email:</strong> {doctor.email}
          </p>
          {doctor.specialization && (
            <p className="card-text">
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
          )}
          {doctor.experience !== undefined && (
            <p className="card-text">
              <strong>Experience:</strong> {doctor.experience} years
            </p>
          )}
          {/* Add more doctor information as needed */}
        </div>
      </div>

      <h3 className="mt-4 mb-3">Upcoming Appointments</h3>
      {appointments.length > 0 ? (
        <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">Patient Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patient?.name || 'N/A'}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          No upcoming appointments.
        </div>
      )}

      <Link to="/home" className="btn btn-secondary mt-3">
        Go to Homepage
      </Link>
    </div>
  );
};

export default DoctorDashboard;
