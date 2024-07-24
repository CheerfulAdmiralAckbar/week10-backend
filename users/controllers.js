const User = require('./model')
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
    // get user with password
    const user = await User.scope('withPassword').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check is password entered matches one in database
    const isMatch = await user.isMatch(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ userId: user, username: user.username }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const verifyTokenController = (req, res) => {
  // Getting to this point means the token is valid so just return the user
  res.status(200).json({ user: req.user.id });
}

module.exports = {
  register,
  login,
  verifyTokenController
};