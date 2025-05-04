import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './appointmentList.css'; // Include this for styling

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppointments = async (pageNumber) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/appointments?page=${pageNumber}&limit=5`);
      setAppointments(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const sendReminder = async (appointmentId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/appointments/${appointmentId}/send-reminder`);
      fetchAppointments(page);
      alert("Reminder sent!");
    } catch (err) {
      console.error('Failed to send reminder:', err);
      alert("Failed to send reminder.");
    }
  };

  const updateAttendedStatus = async (appointmentId, attended) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${appointmentId}/attendance`, {
        attended,
      });
      fetchAppointments(page);
    } catch (err) {
      console.error("Failed to update attended status:", err);
      alert("Failed to update attendance.");
    }
  };

  useEffect(() => {
    fetchAppointments(page);
  }, [page]);

  return (
    <div className="appointment-list-container">
      <h2>Appointment List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Patient Email</th>
            <th>Doctor Email</th>
            <th>Reminder Sent</th>
            <th>Attended</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app._id}>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.time}</td>
              <td>{app.doctor_name || 'N/A'}</td>
              <td>{app.patient_name || 'N/A'}</td>
              <td>{app.patient_email || 'N/A'}</td>
              <td>{app.doctor_email || 'N/A'}</td>
              <td>{app.reminderSent ? "Yes" : "No"}</td>
              <td>
                <select
                  value={app.attended ? "true" : "false"}
                  onChange={(e) => updateAttendedStatus(app._id, e.target.value === "true")}
                >
                  <option value="true">Attended</option>
                  <option value="false">Not Attended</option>
                </select>
              </td>
              <td>
                <button
                  className="reminder-btn"
                  onClick={() => sendReminder(app._id)}
                  disabled={app.reminderSent?.toString().trim().toLowerCase() === "yes"}
                >
                  Send Reminder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default AppointmentList;
