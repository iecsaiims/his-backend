const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const Xray = sequelize.define('Xray', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  // Common Fields
  name: {
    type: DataTypes.STRING
  },
  xray: {
    type: DataTypes.TEXT,
    allowNull:false
  }

}, {
  tableName: 'xray',
  underscored: true
});

module.exports = Xray;

