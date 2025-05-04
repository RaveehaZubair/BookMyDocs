// // client/src/components/AnalyticsDashboard.js
// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';

// const AnalyticsDashboard = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       const response = await axios.get('/api/appointments');
//       // Process data to fit chart format
//       setChartData({
//         labels: ['January', 'February', 'March'],
//         datasets: [
//           {
//             label: 'Appointments',
//             data: [10, 20, 30],
//             backgroundColor: 'rgba(75,192,192,0.6)',
//           },
//         ],
//       });
//     };
//     fetchAnalytics();
//   }, []);

//   return (
//     <div>
//       <h2>Analytics</h2>
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default AnalyticsDashboard;
