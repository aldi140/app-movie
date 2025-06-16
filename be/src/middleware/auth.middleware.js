require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);
  const token = req.headers.authorization?.split(' ')[1];
   console.log("📦 Token diterima dari FE:", token); // 

  if (!token) return res.status(401).json({ message: 'No token provided' });
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Simpan user id ke req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'unauthorized' });
  }
};

module.exports = authMiddleware;
