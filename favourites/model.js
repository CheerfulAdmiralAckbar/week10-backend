const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Favourite = sequelize.define('Favourite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  unsplashId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Favourite;