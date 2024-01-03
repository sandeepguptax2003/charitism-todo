const jwt = require('jsonwebtoken');
require("dotenv").config()

// Middleware function for token authentication
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token.' });
      }
      req.user = user;
      req.user.userId = user.userId;
      next();
    });
  };
  
  module.exports = authenticateToken;