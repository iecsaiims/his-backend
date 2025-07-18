const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const ProgressNotes = sequelize.define('ProgressNotes', {
  // Foreign key to Patient
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  provisional_diagnosis:{
    type:DataTypes.TEXT
  },
  current_condition:{
    type:DataTypes.TEXT
  },
  pulse:{
    type:DataTypes.TEXT
  },
  blood_pressure:{
    type:DataTypes.STRING
  },
  rr:{
    type:DataTypes.STRING
  },
  spo2:{
    type:DataTypes.STRING
  },
  pain_score:{
    type:DataTypes.STRING
  },
  gcs:{
    type:DataTypes.STRING
  },
  blood_test:{
    type:DataTypes.TEXT
  },
  imaging:{
    type:DataTypes.TEXT
  },
  progress_further_management_plan:{
    type:DataTypes.TEXT
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
  tableName: 'progress_notes',
  underscored: true
});

module.exports = ProgressNotes;
