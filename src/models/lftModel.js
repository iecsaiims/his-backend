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
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dBill: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  iBill: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    ast: {  
    type: DataTypes.FLOAT,
    allowNull: false
  },
  alt: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  alp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  totalProtein: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  albumin: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  globulin: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}), {
  tableName: 'lft',
  underscored: true
});

module.exports = Lft;

