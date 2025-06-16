require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOWY5NWRmLTRmNmEtNDAyMy04MmFkLTA3MDJhY2QzNjk0MSIsImlhdCI6MTc0OTk4NzkwMiwiZXhwIjoxNzUwMDc0MzAyfQ.fVvfBS2vjIgR9vEVCCRaSAapo0W4kMqchN4Rq5PvnSw";
const secret = process.env.JWT_SECRET;

console.log("🔐 JWT_SECRET:", secret);

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ valid token:", decoded);
} catch (err) {
  console.error("❌ Verification error:", err.message);
}
