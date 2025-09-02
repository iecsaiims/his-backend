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
ketones: {
  type: DataTypes.STRING,
  allowNull: true
},
nitrites: {
  type: DataTypes.STRING,
  allowNull: true
},
urineCulture: {
  type: DataTypes.STRING,
  allowNull: true
},
  submittedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  }
}), {
  tableName: 'urine_test',
  underscored: true
});

module.exports = UrineTest;

