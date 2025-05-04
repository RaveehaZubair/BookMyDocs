import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctorsList.css'; // Import the new CSS file

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async (pageNumber) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/doctors?page=${pageNumber}&limit=5`);
      setDoctors(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  useEffect(() => {
    fetchDoctors(page);
  }, [page]);

  return (
    <div className="doctor-list-container">
      <h2>Doctor List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.experience}</td>
              <td>{doc.email}</td>
              <td>{doc.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorList;
