const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const LamaConsent = sequelize.define('LamaConsent', istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  lamaConsentDocument: {
    type: DataTypes.TEXT,
    allowNull:false
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
  tableName: 'lama_consent',
  underscored: true
});

module.exports = LamaConsent;
