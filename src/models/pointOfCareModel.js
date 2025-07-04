const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const PointOfCareTest = sequelize.define('PointOfCareTest', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Patient, key: 'id' },
    onDelete: 'CASCADE'
  },

  // POCUS
  pocus_date: DataTypes.DATEONLY,
  pocus_time: DataTypes.TIME,
  pocus_protocol: DataTypes.ENUM('eFAST', 'RUSH', 'BLUE', 'MSK'),
  pocus_findings: DataTypes.TEXT,
  pocus_doctor_sign: DataTypes.STRING,

  // Blood Gas
  blood_gas_date: DataTypes.DATEONLY,
  blood_gas_time: DataTypes.TIME,
  blood_gas_type: DataTypes.ENUM('Arterial', 'Venous'),
  ph: DataTypes.STRING,
  pco2: DataTypes.STRING,
  po2: DataTypes.STRING,
  hco3: DataTypes.STRING,
  sodium: DataTypes.STRING,
  potassium: DataTypes.STRING,
  chloride: DataTypes.STRING,
  blood_gas_other: DataTypes.STRING,
  blood_gas_interpretation: DataTypes.TEXT,
  blood_gas_doctor_sign: DataTypes.STRING,

  // Troponin
  trop_date: DataTypes.DATEONLY,
  trop_time: DataTypes.TIME,
  trop_type: DataTypes.ENUM('Qualitative', 'Quantitative'),
  trop_subtype: DataTypes.ENUM('Trop I', 'Trop T'),
  trop_value: DataTypes.STRING,
  trop_interpretation: DataTypes.ENUM('Positive', 'Negative'),
  trop_doctor_sign: DataTypes.STRING,

  // Other (proBNP/D-dimer/etc)
  other_date: DataTypes.DATEONLY,
  other_time: DataTypes.TIME,
  other_type: DataTypes.STRING,
  other_value: DataTypes.STRING,
  other_interpretation: DataTypes.ENUM('Positive', 'Negative'),

  // ECG
  ecg_date: DataTypes.DATEONLY,
  ecg_time: DataTypes.TIME,
  ecg_findings: DataTypes.TEXT,
  ecg_image: DataTypes.STRING,
  ecg_doctor_sign: DataTypes.STRING,

  // X-Ray
  xray_date: DataTypes.DATEONLY,
  xray_time: DataTypes.TIME,
  xray_type: DataTypes.STRING,
  xray_findings: DataTypes.TEXT,
  xray_image: DataTypes.STRING,

  // CT Scan
  ct_date: DataTypes.DATEONLY,
  ct_time: DataTypes.TIME,
  ct_type: DataTypes.STRING,
  ct_findings: DataTypes.TEXT,
  ct_image: DataTypes.STRING

}, {
  tableName: 'point_of_care_tests',
  underscored: true
});

module.exports = PointOfCareTest;
