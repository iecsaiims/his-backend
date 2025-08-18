const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Cbc = sequelize.define('Cbc',istTimestamps({
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
  hemoglobin: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  hct: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mcv: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rdwcv: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tlc: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  neutrophils: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  lymphocytes: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  monocytes: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  eosinophils: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  basophil: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  plateletCount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

}), {
  tableName: 'cbc',
  underscored: true
});

module.exports = Cbc;

