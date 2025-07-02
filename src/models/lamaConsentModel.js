const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const LamaConsent = sequelize.define('LamaConsent', {
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
  age: {
    type: DataTypes.STRING
  },
  sex: {
    type: DataTypes.STRING
  },
  guardian_name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },

  documents_uploaded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'lama_consent',
  underscored: true
});

module.exports = LamaConsent;
