const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel')

const GeneralEmergencyCare = sequelize.define('GeneralEmergencyCare', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    }
  },

  chief_complains: {
    type:DataTypes.TEXT,
  },
  history_of_present_illness: {
    type:DataTypes.TEXT,
  },
  review_of_symptoms: {
    type:DataTypes.TEXT,
  },
  progression_of_symptoms: {
    type:DataTypes.TEXT,
  },
  why_today: {
    type:DataTypes.TEXT,
  },
   general_physical_examination: {
    type:DataTypes.TEXT,
  },
  systemic_examination: {
    type:DataTypes.TEXT,
  },
  relevant_investigation_findings: {
    type:DataTypes.TEXT,
  },
  provisional_dx_differentials: {
    type:DataTypes.TEXT,
  },
  emergency_further_management_plan: {
    type:DataTypes.TEXT,
  },
  submitted_by:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type: DataTypes.STRING,
    allowNull:false
  }

}, {
  tableName: 'general_emergency_care',
  underscored: true,
});

module.exports = GeneralEmergencyCare;
