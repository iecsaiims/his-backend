const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const istTimestamps = require('./baseModel.js');

const User = sequelize.define('User', istTimestamps({
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  designation: {
    type: DataTypes.ENUM('Doctor', 'Nursing Staff', 'Others'),
  },
}), {
  tableName: 'users',
  underscored: true,
});

module.exports = User;