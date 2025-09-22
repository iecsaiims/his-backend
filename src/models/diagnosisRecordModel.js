const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const DiagnosisRecord = sequelize.define('DiagnosisRecord', istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
    remark: {
        type: DataTypes.TEXT
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
  tableName: 'DiagnosisRecord',
  underscored: true
});

module.exports = DiagnosisRecord;
