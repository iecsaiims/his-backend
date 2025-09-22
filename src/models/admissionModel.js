const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Admission = sequelize.define('Admission', istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  wardConsentDocument: {
    type: DataTypes.TEXT,
    allowNull:false
  },
    ward: {
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
  tableName: 'Admission',
  underscored: true
});

module.exports = Admission;
