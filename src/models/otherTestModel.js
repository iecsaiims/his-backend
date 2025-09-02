const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const OtherTest = sequelize.define('OtherTest', istTimestamps({
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
    type: DataTypes.ENUM('Negative', 'Positive')
  },
  dDimerValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  dDimerInterpretaion: {
    type: DataTypes.ENUM('Negative', 'Positive')
  },
  crpValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  crpInterpretaion: {
    type: DataTypes.ENUM('Negative', 'Positive')
  },
  esrValue: {
    type: DataTypes.STRING,
    allowNull:true
  },
  esrInterpretaion: {
    type: DataTypes.ENUM('Negative', 'Positive')
  },
  submittedBy:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  }

}), {
  tableName: 'other_test',
  underscored: true
});

module.exports = OtherTest;

