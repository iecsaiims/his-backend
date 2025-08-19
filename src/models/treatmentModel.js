const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Treatment = sequelize.define('Treatment',istTimestamps({
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
  drugName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
    dose: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    frequency: {
    type: DataTypes.STRING,
    allowNull: false
  },
    route: {
    type: DataTypes.STRING,
    allowNull: false
  },
    specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: false
    }
}), {
  tableName: 'treatment-details',
  underscored: true
});

module.exports = Treatment;

