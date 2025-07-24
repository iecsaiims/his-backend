const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const DischargeSummary = sequelize.define('DischargeSummary',istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Discharge Summary Section
  discharge_clinical_course: {
    type: DataTypes.TEXT
  },
  discharge_provisional_diagnosis: {
    type: DataTypes.TEXT
  },
  pulse: {
    type: DataTypes.STRING
  },
  blood_pressure: {
    type: DataTypes.STRING
  },
  respiratory_rate: {
    type: DataTypes.STRING
  },
  spo2: {
    type: DataTypes.STRING
  },
  pain_score: {
    type: DataTypes.STRING
  },
  gcs: {
    type: DataTypes.STRING
  },
  discharge_advice: {
    type: DataTypes.TEXT
  },
  submittedBy:{
    type: DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type: DataTypes.STRING,
    allowNull:false
  }

}), {
  tableName: 'discharge_summary',
  underscored: true
});

module.exports = DischargeSummary;
