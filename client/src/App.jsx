// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/adminDashboard.jsx';
import DoctorList from './pages/doctorList.jsx';
import PatientList from './pages/patientList.jsx';
import AppointmentList from './pages/appointmentList.jsx';
import AnalyticsDashboard from './pages/analyticsDashboard.jsx';
// import NotificationPage from './pages/notificationPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthToggle from './pages/AuthToggle';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboardNew';
import PatientDashboard from './pages/PatientDashboard';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage'; //  Ensure LoginPage component exists and is imported
import { isAuthenticated } from './auth';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="doctors" element={<DoctorList />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="/" element={<AuthToggle />} /> {/* Root path for AuthToggle (Login/Register) */}
        <Route path="/register" element={<AuthToggle />} /> {/* Registration page */}
        <Route path="/login" element={<LoginPage />} /> {/* Explicit route for LoginPage - ALWAYS render */}
        <Route path="/home" element={
         isAuthenticated() ? <HomePage /> : <Navigate to="/login" />
          } /> {/* Protected route for HomePage */}
         <Route path="/dashboard" element={
         isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
          } /> {/* Protected route for Dashboard */}
         <Route path="/doctor-dashboard" element={
         isAuthenticated() ? <DoctorDashboard /> : <Navigate to="/login" />
         } /> {/* Protected route for Doctor Dashboard */}
        <Route path="/patient-dashboard" element={
         isAuthenticated() ? <PatientDashboard /> : <Navigate to="/login" />
         } /> {/* Protected route for Patient Dashboard */}
        {/* <Route path="notifications" element={<NotificationPage />} />*/}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
