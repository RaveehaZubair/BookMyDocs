import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import './AnalyticsDashboard.css';

const COLORS = ['#00C49F', '#FF8042', '#8884d8', '#FFBB28', '#0088FE'];

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    appointmentsOverTime: [],
    doctorActivity: [],
    noShowStats: []
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/analytics');
        setData(res.data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className="analytics-container">
      {/* <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button> */}

      <h2>📊 Analytics Dashboard</h2>

      {/* Appointments Over Time */}
      <div className="analytics-section">
        <h3>📅 Appointments Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data.appointmentsOverTime}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorCount)"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Doctor Activity */}
      <div className="analytics-section">
        <h3>👨‍⚕️ Doctor Activity</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.doctorActivity} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="doctor" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="appointments" fill="#82ca9d" barSize={25} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* No-Show Stats */}
      <div className="analytics-section">
        <h3>🚫 No-Show Statistics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data.noShowStats}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1000}
            >
              {data.noShowStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
