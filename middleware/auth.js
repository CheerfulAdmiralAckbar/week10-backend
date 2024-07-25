const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwt = require('jsonwebtoken');

const User = require('../users/model'); 

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  console.log('All headers:', JSON.stringify(req.headers, null, 2));
  console.log('Authorization header:', req.headers['authorization']);
  console.log('authorization header:', req.headers['authorization']);

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded token:', decoded);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

const hashPass = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500) .json({
      message: error.message,
      error
    });
  }
}

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    
    if (!user) {
      res.status(401).json({
        message: 'User not found',
      });
    }
    
    if (!user.password) {
      res.status(401).json({
        message: 'User not found',
      });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    
    if (!isMatch) {
      res.status(401).json({
        message: 'Invalid password',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error
    });
  }
}

module.exports = {
  hashPass,
  comparePass,
  verifyToken
}