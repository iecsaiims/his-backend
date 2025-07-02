const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const TransferOut = sequelize.define('TransferOut', {
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

  // Transfer Out Slip Section
  referred_date: {
    type: DataTypes.DATEONLY
  },
  referred_time: {
    type: DataTypes.TIME
  },
  referred_to_facility: {
    type: DataTypes.STRING
  },
  transfer_provisional_diagnosis: {
    type: DataTypes.TEXT
  },
  transfer_attended_date: {
    type: DataTypes.DATEONLY
  },
  transfer_attended_time: {
    type: DataTypes.TIME
  },
  chief_complaints: {
    type: DataTypes.TEXT
  },
  reason_for_referral: {
    type: DataTypes.TEXT
  },
  condition_at_referral: {
    type: DataTypes.ENUM('Stable', 'Unstable')
  },
  treatment_received: {
    type: DataTypes.TEXT
  },
  referring_physician_name: {
    type: DataTypes.STRING
  },
  referring_physician_designation: {
    type: DataTypes.STRING
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

  // LAMA Consent Section
  lama_patient_name: {
    type: DataTypes.STRING
  },
  lama_age: {
    type: DataTypes.STRING
  },
  lama_sex: {
    type: DataTypes.STRING
  },
  lama_guardian_name: {
    type: DataTypes.STRING
  },
  lama_address: {
    type: DataTypes.TEXT
  },

  documents_uploaded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'transfer_out',
  underscored: true
});

module.exports = TransferOut;
