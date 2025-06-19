const sequelize = require('../config/db.js');
const User = require('./userModel')

const Patient = require('./patientModel');
const PatientTriage = require('./patientTriageModel');

Patient.hasMany(PatientTriage, {
  foreignKey: 'patient_id',
  as: 'patientTriage',
  onDelete: 'CASCADE'
});

PatientTriage.belongsTo(Patient, {
  foreignKey: 'patient_id',
  as: 'patient'
});



module.exports = { sequelize, User, Patient, PatientTriage };