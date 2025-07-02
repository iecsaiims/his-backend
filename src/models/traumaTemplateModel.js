const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const TraumaTemplate = sequelize.define('TraumaTemplate', {
  // Foreign key to Patient
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  aho: {
    type: DataTypes.ENUM('Road traffic accident', 'Assault', 'Fall', 'Others'),
    allowNull: true
  },

  place_of_event: {
    type: DataTypes.STRING,
    allowNull: true
  },

  date_of_injury: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },

  time_of_injury: {
    type: DataTypes.TIME,
    allowNull: true
  },

  mechanism_of_injury: {
    type: DataTypes.STRING,
    allowNull: true
  },

  mlc_no: {
    type: DataTypes.STRING,
    allowNull: true
  },

  presenting_complaints: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  loss_of_consciousness: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  ent_bleed: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  amnesia: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  seizures: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  vomiting: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  injury_identified: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  allergy_history: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  medication_history: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  past_history: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  lmp: {
    type: DataTypes.STRING,
    allowNull: true
  },

  upt: {
    type: DataTypes.ENUM('Positive', 'Negative', 'Not done'),
    allowNull: true
  },

  last_meal: {
    type: DataTypes.STRING,
    allowNull: true
  },

  prior_treatment: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  investigation_advised: {
    type: DataTypes.JSONB,
    allowNull: true // array: e.g., ['X-ray', 'CT Scan']
  },

  treatment_plan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  submitted_by:{
    type:DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'trauma_templates',
  underscored: true
});

module.exports = TraumaTemplate;
