const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const Xray = sequelize.define('Xray', {
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
  xrayType: {
    type: DataTypes.ENUM('Chest','Pelvis', 'Extremities', 'Other')
  },
  xrayImage: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  xrayFindings: {
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
  tableName: 'xray',
  underscored: true
});

module.exports = Xray;

