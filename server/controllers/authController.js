exports.register = async (req, res) => {
  const { name, email, password, role, age, gender, specialization, experience, availability } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      age,
      gender,
      specialization: role === 'doctor' ? specialization : undefined,
      experience: role === 'doctor' ? experience : undefined,
      availability: role === 'doctor' ? availability : undefined, // Accept dynamic availability here
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
