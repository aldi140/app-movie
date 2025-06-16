const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const wishlistRoutes = require('./routes/wishlist.routes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // ganti sesuai URL FE kamu
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.get('/', (req, res) => res.send('API Running...'));

module.exports = app;
