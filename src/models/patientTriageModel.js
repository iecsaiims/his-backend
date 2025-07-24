const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel.js');

const PatientTriage = sequelize.define('PatientTriage', istTimestamps({
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  spo2: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hr: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rbs: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emergencyType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  triage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  triageNotes: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  submittedBy:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  }
}), {
  tableName: 'patient_triages',
  underscored: true
});

module.exports = PatientTriage;
