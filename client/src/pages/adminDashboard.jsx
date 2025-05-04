// src/pages/adminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const activeStyle = {
    fontWeight: 'bold',
    color: '#007bff',
    textDecoration: 'underline',
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
          <li>
              <NavLink to="/doctors" style={({ isActive }) => isActive ? activeStyle : undefined}>
                👨‍⚕️ Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/patients" style={({ isActive }) => isActive ? activeStyle : undefined}>
                🧑‍🤝‍🧑 Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointments" style={({ isActive }) => isActive ? activeStyle : undefined}>
                📅 Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" style={({ isActive }) => isActive ? activeStyle : undefined}>
                📊 Analytics
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="toggle-dark" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Admin Panel</h1>
        </header>
        <div className="dashboard-outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
