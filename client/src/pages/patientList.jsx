import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './patientList.css'; // Import the CSS file

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPatients = async (pageNumber) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/patients?page=${pageNumber}&limit=5`);
      setPatients(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((pat) => (
            <tr key={pat._id}>
              <td>{pat.name}</td>
              <td>{pat.age}</td>
              <td>{pat.gender}</td>
              <td>{pat.email}</td>
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

export default PatientList;
