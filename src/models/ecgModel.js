const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const Ecg = sequelize.define('Ecg', {
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
  ecgImage: {
    type: DataTypes.TEXT
  },
  ecgFindings: {
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
  tableName: 'ecg',
  underscored: true
});

module.exports = Ecg;

