const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const UrineTest = sequelize.define('UrineTest',istTimestamps({
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
  urineRoutineMicroscopy: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    urineDipstick: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}), {
  tableName: 'urineTest',
  underscored: true
});

module.exports = UrineTest;

