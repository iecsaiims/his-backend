const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const CtScan = sequelize.define('CtScan', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  // Common Fields
  ctType: {
    type: DataTypes.ENUM('Chest','Pelvis', 'Extremities', 'Other')
  },
  ctScanImage: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  ctFindings: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  submittedBy:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  }

}, {
  tableName: 'ct_scan',
  underscored: true
});

module.exports = CtScan;

