const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Auth Header:", authHeader);  // ✅ LOG

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token Extracted:", token);  // ✅ LOG

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);  // ✅ LOG

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded Token:", decoded);  // ✅ LOG
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err);  // ✅ LOG ERROR
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
