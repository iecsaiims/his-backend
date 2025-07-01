const sequelize = require('../config/db.js');
const User = require('./userModel')

const Patient = require('./patientModel');
const PatientTriage = require('./patientTriageModel');
const PrimaryAssessment = require('./primaryAssessmetModel');

Patient.hasMany(PatientTriage, {foreignKey: 'patient_id', as: 'patientTriage', onDelete: 'CASCADE'});
PatientTriage.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasOne(PrimaryAssessment, { foreignKey: 'patient_id', as: 'primaryAssessment' });
PrimaryAssessment.belongsTo(Patient, { foreignKey: 'patient_id' });



module.exports = { sequelize, User, Patient, PatientTriage, PrimaryAssessment };