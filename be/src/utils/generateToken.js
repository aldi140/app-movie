require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  console.log("🧬 JWT_SECRET saat generateToken:", process.env.JWT_SECRET); // <--- tambahkan ini
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = generateToken;
