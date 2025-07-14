const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const OtherTest = sequelize.define('OtherTest', {
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
  
  otherTestType: {
    type: DataTypes.ENUM('pro BNP', 'D-dimer','CRP','ESR')
  },
  otherTestValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  otherTestInterpretaion: {
    type: DataTypes.ENUM('Positive', 'Negative')
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
  tableName: 'other_test',
  underscored: true
});

module.exports = OtherTest;

