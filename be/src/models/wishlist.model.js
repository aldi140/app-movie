const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Wishlist extends Model {}

Wishlist.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  tmdbId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster_path: {
    type: DataTypes.STRING,
  },
  realase_date: {
    type: DataTypes.STRING,
  },
  overview: {
    type: DataTypes.TEXT,
  },
  vote_average: {
    type: DataTypes.FLOAT,
  },
}, {
  sequelize,
  modelName: 'Wishlist',
  tableName: 'wishlists',
  timestamps: true,
  indexes: [
  {
    unique: true,
    fields: ['userId', 'tmdbId'],
  }
]
});

module.exports = Wishlist;