const sequelize = require('../config/db.js');
const User = require('./userModel')

const Patient = require('./patientModel');
const PatientTriage = require('./patientTriageModel');
const PrimaryAssessment = require('./primaryAssessmetModel');
const GeneralEmergencyCare = require('./generalEmergencyCaseModel.js')
const TraumaTemplate = require('./traumaTemplateModel.js')
const ProgressNotes = require('./progressNotesModel.js')
const TransferOut = require('./transferOutModel.js')
const DischargeSummary = require('./dischargeSummayModel.js');
const LamaConsent = require('./lamaConsentModel.js');

Patient.hasMany(PatientTriage, {foreignKey: 'patient_id', as: 'patientTriage', onDelete: 'CASCADE'});
PatientTriage.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasOne(PrimaryAssessment, { foreignKey: 'patient_id', as: 'primaryAssessment' });
PrimaryAssessment.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasMany(GeneralEmergencyCare, {foreignKey: 'patient_id', as: 'GeneralEmergencyCare', onDelete: 'CASCADE'});
GeneralEmergencyCare.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasMany(TraumaTemplate, {foreignKey: 'patient_id',as: 'traumaTemplates'});
TraumaTemplate.belongsTo(Patient, { foreignKey: 'patient_id',as: 'patient'});

Patient.hasMany(ProgressNotes, {foreignKey: 'patient_id', as: 'ProgressNotes', onDelete: 'CASCADE'});
ProgressNotes.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasMany(TransferOut, {foreignKey: 'patient_id', as: 'TransferOut', onDelete: 'CASCADE'});
TransferOut.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasMany(DischargeSummary, {foreignKey: 'patient_id', as: 'DischargeSummary', onDelete: 'CASCADE'});
DischargeSummary.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

Patient.hasMany(LamaConsent, {foreignKey: 'patient_id', as: 'LamaConsent', onDelete: 'CASCADE'});
LamaConsent.belongsTo(Patient, {foreignKey: 'patient_id',as: 'patient'});

module.exports = { sequelize, User, Patient, PatientTriage, PrimaryAssessment, TraumaTemplate, ProgressNotes, TransferOut,DischargeSummary, LamaConsent};