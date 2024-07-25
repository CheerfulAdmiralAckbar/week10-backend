const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('../users/model');

const Favourite = sequelize.define('favourite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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
    type: DataTypes.STRING
  }
}, {
  tableName: 'favourites',
  modelName: 'favourite'
});

// Define the association
Favourite.belongsTo(User, { foreignKey: 'userId' });

module.exports = Favourite;