const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(express.json());

// CORS Configuration to allow only the frontend on port 5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Use the admin routes
app.use('/api/admin', adminRoutes);  // e.g. /api/admin/doctors

// Global error handler for any route
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error for debugging
  res.status(500).json({ message: 'Server Error' });
});

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connected');
    // Start server on the specified port (or default to 5000)
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
