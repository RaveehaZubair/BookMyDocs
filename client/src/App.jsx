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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="doctors" element={<DoctorList />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        {/* <Route path="notifications" element={<NotificationPage />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
