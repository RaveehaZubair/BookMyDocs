// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation
const User = require('../models/User'); // Import User model
const authMiddleware = require('../middleware/authMiddleware'); // For JWT authentication middleware
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role, age, gender, specialization, experience, availability } = req.body; // Get specialization and experience

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      age,
      gender,
      specialization: role === 'doctor' ? specialization : undefined, // Save if role is doctor
      experience: role === 'doctor' ? experience : undefined,       // Save if role is doctor
      availability: role === 'doctor' ? availability : undefined,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Protected route (example)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ msg: `Hello ${req.user.role}, welcome to your dashboard` });
});

module.exports = router;