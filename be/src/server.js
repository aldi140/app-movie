require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
const { User, Wishlist } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true}); // bisa pakai { force: true } untuk reset
    console.log('DB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
})();

module.exports = app;