const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const OtherTest = sequelize.define('OtherTest', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  proBnpValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  proBnpInterpretaion: {
    type: DataTypes.ENUM('Positive', 'Negative')
  },
  dDimerValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  dDimerInterpretaion: {
    type: DataTypes.ENUM('Positive', 'Negative')
  },
  crpValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  crpInterpretaion: {
    type: DataTypes.ENUM('Positive', 'Negative')
  },
  esrValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  esrInterpretaion: {
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

