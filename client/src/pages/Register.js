import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate();

  const handleUserChange = (type) => setUserType(type);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Register</h2>
          <div className="btn-group d-flex mb-4" role="group">
            <button
              type="button"
              className={`btn ${userType === 'patient' ? 'btn-primary' : 'btn-outline-primary'} w-50`}
              onClick={() => handleUserChange('patient')}
            >
              Patient
            </button>
            <button
              type="button"
              className={`btn ${userType === 'doctor' ? 'btn-primary' : 'btn-outline-primary'} w-50`}
              onClick={() => handleUserChange('doctor')}
            >
              Doctor
            </button>
          </div>
          {userType === 'patient' ? <PatientForm navigate={navigate} /> : <DoctorForm navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}

function PatientForm({ navigate }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: 'Male'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Ensure all form data is sent, including the role for the patient
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: 'patient' // Add the role explicitly as 'patient'
      });

      alert("Registration successful! Please log in.");
      navigate("/login");

    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleRegister} className="form-horizontal">
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input type="text" name="name" className="form-control" id="name" placeholder="Enter your name" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
          <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
        <div className="col-sm-9">
          <input type="password" name="password" className="form-control" id="password" placeholder="Choose a strong password" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="age" className="col-sm-3 col-form-label">Age</label>
        <div className="col-sm-9">
          <input type="number" name="age" className="form-control" id="age" placeholder="Your age" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
        <div className="col-sm-9">
          <select name="gender" className="form-control" id="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-9 offset-sm-3">
          <button type="submit" className="btn btn-primary mt-3 w-100">Register as Patient</button>
        </div>
      </div>
    </form>
  );
}

function DoctorForm({ navigate }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', specialization: '', experience: '', availability: 'Available', age: '', gender: 'Male'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: 'doctor'
      });

      alert("Registration successful! Please log in.");
      navigate("/login");

    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleRegister} className="form-horizontal">
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input type="text" name="name" className="form-control" id="name" placeholder="Enter your name" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
          <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
        <div className="col-sm-9">
          <input type="password" name="password" className="form-control" id="password" placeholder="Choose a strong password" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="specialization" className="col-sm-3 col-form-label">Specialization</label>
        <div className="col-sm-9">
          <input type="text" name="specialization" className="form-control" id="specialization" placeholder="Enter specialization" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="experience" className="col-sm-3 col-form-label">Experience (Years)</label>
        <div className="col-sm-9">
          <input type="number" name="experience" className="form-control" id="experience" placeholder="Enter experience" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="availability" className="col-sm-3 col-form-label">Availability</label>
        <div className="col-sm-9">
          <select name="availability" className="form-control" id="availability" onChange={handleChange}>
            <option>Available</option>
            <option>Not Available</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="age" className="col-sm-3 col-form-label">Age</label>
        <div className="col-sm-9">
          <input type="number" name="age" className="form-control" id="age" placeholder="Enter your age" onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
        <div className="col-sm-9">
          <select name="gender" className="form-control" id="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-9 offset-sm-3">
          <button type="submit" className="btn btn-primary mt-3 w-100">Register as Doctor</button>
        </div>
      </div>
    </form>
  );
}

export default Register;
