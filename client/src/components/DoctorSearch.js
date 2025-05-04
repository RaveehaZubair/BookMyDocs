import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DoctorSearch = ({ onSearch }) => {
  const [specialization, setSpecialization] = useState('');
  const [availability, setAvailability] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(specialization, availability);
      console.log('DoctorSearch handleSearch called with:', specialization, availability)
    }
  };

  const searchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctor/search', {
        params: { specialization, availability }
      });
      setDoctors(response.data);
    } catch (error) {
      setError('Error fetching doctors');
      console.error(error);
    }
  };

  useEffect(() => {
    searchDoctors(); // Perform the search initially or whenever the criteria change
  }, [specialization, availability]);

  return (
    <div>
      <h2>Search Doctors</h2>
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option value="">Any Availability</option>
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default DoctorSearch;