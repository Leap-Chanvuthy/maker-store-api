const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(errorHandler(401, 'Authorized token required'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return next(errorHandler(401, 'Unauthorized: Invalid token'));
  }
};

module.exports = verifyToken;
