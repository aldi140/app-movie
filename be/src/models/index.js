const User = require("./user.model");
const Wishlist = require("./wishlist.model");


User.hasMany(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Wishlist
};
