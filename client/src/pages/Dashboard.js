// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);

  const navigateToRoleDashboard = () => {
    if (user?.role === "doctor") { // Added optional chaining
      navigate("/doctor-dashboard");
    } else if (user?.role === "patient") { // Added optional chaining
      navigate("/patient-dashboard");
    } else {
      alert("Role not assigned.");
    }
  };

  return (
    <div className="container mt-5 text-center"> {/* Center align content */}
      <h2>Welcome to the Dashboard</h2>
      {user?.role && <p className="lead">You are logged in as a <strong>{user.role}</strong>.</p>} {/* Display user role */}
      <p>Choose your role to go to your dashboard:</p>
      <button onClick={navigateToRoleDashboard} className="btn btn-primary btn-lg"> {/* Larger button */}
        Go to My Dashboard
      </button>
    </div>
  );
};

export default Dashboard;