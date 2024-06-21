const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const adminCheck = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No authorization header found');
    return next(errorHandler(401, 'Authorized token required'));
  }

  const token = authHeader.split(' ')[1]; // Assuming Bearer token format

  if (!token) {
    console.log('No token found');
    return next(errorHandler(401, 'Authorized token required'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    if (decoded.user_type === 'ADMIN') {
      req.user = decoded; // Attach decoded token to req.user
      next();
    } else {
      console.log('User is not an admin:', decoded.user_type);
      return next(errorHandler(403, 'Forbidden: Admin access required'));
    }
  } catch (error) {
    console.log('Token verification error:', error);
    return next(errorHandler(401, 'Unauthorized: Invalid token'));
  }
};

module.exports = adminCheck;
