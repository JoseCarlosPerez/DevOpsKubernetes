const { sequelize } = require('../db');
const { DataTypes, Model } = require('sequelize');

class Todo extends Model {}
Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'todo'
});

module.exports = Todo;
