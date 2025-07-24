const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel.js');

const TransferOut = sequelize.define('TransferOut', istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
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
  submittedBy:{
    type: DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type: DataTypes.STRING,
    allowNull:false
  }
}), {
  tableName: 'transfer_out',
  underscored: true
});

module.exports = TransferOut;
