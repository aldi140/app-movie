require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nama, email, password: hashed });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Invalid email or password' });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) return res.status(401).json({ message: 'Invalid email or password' });

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: '1d',
    // });
    const userData = {
      id: user.id,
      email: user.email,
      name: user.nama
    }
    const token = generateToken(userData.id);
    res.status(200).json({ user: userData, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
