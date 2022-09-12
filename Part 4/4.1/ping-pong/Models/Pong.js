const { sequelize } = require('../db');
const { DataTypes, Model } = require('sequelize');

class Pong extends Model {}
Pong.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pong: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
});

module.exports = Pong;
