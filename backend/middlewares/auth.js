import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token, assuming the format is "Bearer <token>"
    const decoded = jwt.verify(token.split(' ')[1], config.jwtSecret);
    console.log(req.headers.authorization);
    // Attach the user to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
