import jwt from "jsonwebtoken";

const authenticationToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token missing", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res
      .status(401)
      .json({ message: "Invalid token", success: false });
    }
    req.id=decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token', success: false });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', success: false });
    }
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error during authentication', success: false });
  }
};

export default authenticationToken;