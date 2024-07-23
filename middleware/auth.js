const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const User = require('../users/model'); 

const verifyToken = (req, res, next) => {
  // get the token from the header and remove bearer from it
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
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