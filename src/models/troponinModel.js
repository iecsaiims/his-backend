const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const Troponin = sequelize.define('Troponin', {
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
  troponinType: {
    type: DataTypes.ENUM('trop I', 'Trop T')
  },
  testType: {
    type: DataTypes.ENUM('Qualitative', 'Quantitative')
  },
  troponinInterpretaion: {
    type: DataTypes.ENUM('Normal', 'Abnormal')
  },
  troponinValue: {
    type: DataTypes.STRING,
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
  tableName: 'troponin',
  underscored: true
});

module.exports = Troponin;

