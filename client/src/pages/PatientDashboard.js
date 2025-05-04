import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/patient/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientInfo(res.data.patient);
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error("Error fetching patient dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading patient dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Patient Dashboard</h2>

      {patientInfo ? (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-success">{patientInfo.name}</h4>
            <p className="card-text">
              <strong>Age:</strong> {patientInfo.age}
            </p>
            <p className="card-text">
              <strong>Gender:</strong> {patientInfo.gender}
            </p>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          No patient information found.
        </div>
      )}

      <div>
        <h4 className="mt-4 mb-3">Upcoming Appointments</h4>
        {appointments.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Doctor</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
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
      </div>
    </div>
  );
};

export default PatientDashboard;
