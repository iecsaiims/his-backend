const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Lft = sequelize.define('Lft',istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Common Fields
  tBill: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dBill: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iBill: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ast: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalProtein: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  globulin: {
    type: DataTypes.STRING,
    allowNull: false
  }
}), {
  tableName: 'lft',
  underscored: true
});

module.exports = Lft;

