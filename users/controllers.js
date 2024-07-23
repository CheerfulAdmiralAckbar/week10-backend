const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await user.isMatch(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  register,
  login
};