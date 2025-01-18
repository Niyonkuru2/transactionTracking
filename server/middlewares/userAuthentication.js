import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

export const protectUser = async (req, res, next) => {
  // Check for the token in the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized, Login Again' });
  }
  
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    
    // Fetch the user based on the decoded ID
    req.user = await userModel.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle expired token specifically
    if (error.name === 'TokenExpiredError') {
      return res.json({ success: false, message: 'Token expired, please log in again' });
    }
    return res.json({ success: false, message: error.message });
  }
};
